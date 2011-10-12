#
# Coffescript Flow Visualiser view.
#
# Compile to javascript with coffee
#

#TODO tidy this so it's root= exports ? this and Trail is added to root namespace.  It will make more sense.
Trail= exports ? this

Trail.init = -> 
  canvas = document.createElement('canvas')
  Trail.maxY = 400.0
  Trail.maxX = 600.0
  canvas.height = Trail.maxY
  canvas.width = Trail.maxX
  $('#tracker').append(canvas)
  Trail.tt= new Array()
  Trail.freshdata()
  Trail.clear()
  Trail.rpstream = "<stream></stream>"

  Trail.timeline = new Trail.TimeLine('#history', Trail.maxX, 
                          30, Trail)
  Trail.timeline.clear()
  Trail.timeline.frame()
  #Get history (from cloud)
  #default scale
  xs = [0,620]
  ys = [0,600]
  Trail.set_scale(xs,ys)

#
# New trailtrace with hash
#
Trail.trailtrace = (key) ->
  Trail.tt[key] ?= 'make'
  if (Trail.tt[key] == 'make')
    AppReport("New Trailtrace for "+key)
    canvas = $('canvas')[0]
    Trail.tt[key] = new Trail.TrailTrace(canvas, canvas.width, canvas.height, 1.08, 80, Trail.huefromcode(key))
  #return
  Trail.tt[key]

#find the maximum x and y and figure out the canvas scale
#receive and array of all x's and and array of all y's
Trail.set_scale = (xs, ys) -> 
  bigx = 1<<31
  smallx = 1<<30
  bigy = 1<<31
  smally = 1<<30

  for x in xs 
    bigx = x if x > bigx
    smallx = x if x < smallx

  for y in ys 
    bigy = y if y > bigy
    smally = y if y < smally

  xrange = bigx - smallx
  yrange = bigy - smally

  Trail.xoffset = 0-smallx
  Trail.yoffset = 0-smally

  data_longness = xrange / yrange
  canvas_longness = Trail.maxX / Trail.maxY

  if data_longness > canvas_longness
    Trail.scale = (Trail.maxX - (5*2)) / xrange
  else
    Trail.scale = (Trail.maxY - (5*2)) / yrange

  Trail.xcentering = (Trail.maxX - (xrange*Trail.scale))/2 
  Trail.ycentering = (Trail.maxY - (yrange*Trail.scale))/2 

  AppReport("Scale: #{Trail.scale} bigx: #{bigx} smallx: #{smallx}")


Trail.markout = (point) ->
  x1 = point[0]
  y1 = point[1]
  x2 = point[2]
  y2 = point[3]
  code = point[4]
  #cannot get coffeescript to handle multiple lines here!
  Trail.trailtrace(code).squaremark( Trail.xcentering+(x1+Trail.xoffset)*Trail.scale, Trail.ycentering+(y1+Trail.yoffset)*Trail.scale, Trail.xcentering+(x2+Trail.xoffset)*Trail.scale, Trail.ycentering+(y2+Trail.yoffset)*Trail.scale, Trail.huefromcode(code))


Trail.markout_trail = (point) ->
  x1 = point[0]
  y1 = point[1]
  x2 = point[2]
  y2 = point[3]
  code = point[4]
  #AppReport("point #{x1}, #{y1}")
  #cannot get coffeescript to handle multiple lines here!
  Trail.trailtrace(code).mark( Trail.xcentering+(x1+Trail.xoffset)*Trail.scale, Trail.ycentering+(y1+Trail.yoffset)*Trail.scale, Trail.huefromcode(code))

#
# Draw the visualisation from the configured source and according to the 
# configured output type.
#
Trail.draw = ->
  Trail.freshdata()
  if (AppCtl.getDsFile() == 1)
    #Draw by selecting a file
    Trail.select()
  else
    #Draw by downloading
    Trail.download()

Trail.freshdata = ->
  Trail.points = []
  Trail.positions = []
  Trail.ments = null
  Trail.doc = null

#
# Button click animate - must be a fetch first
#
Trail.animate = ->
  Trail.timeline.animate()

Trail.stop = ->
  Trail.stopReplay()

Trail.stopReplay = ->
  if @replayRunning?
    AppReport("Stopping replay #{@replayRunning}")
    replay_url = "replay-control/#{@replayRunning}?stop=1" 
    Trail.putToCloud(replay_url,Trail.replayctlResponseHandler)
    Trail.replayStopped()
  else
    AppReport("No replay running")

Trail.replayStopped = ->
    AppReport("Replay stopped")
    @replayRunning = null

Trail.replayctlResponseHandler = ->
  AppReport("ok")

Trail.replay = ->
  #using a sub function solves missing structureRequest problem 
  #just not sure why.
  Trail.startReplay()

Trail.startReplay = ->
  AppReport("Starting a Replay")

  if @replayRunning?
    AppReport("Replay #{@replayRunning} already running")
  else
    @structureRequest = Trail.replayWithStructure
    Trail.getStructure()
  
Trail.replayWithStructure = ->
  aspect = @aspects[0]
  AppReport("Starting replay for #{aspect}")
  replay_url = "replay-create/#{aspect}?start=1&rate=#{AppCtl.getRate()}&gapskip=#{AppCtl.getSkip()}" 
  Trail.putToCloud(replay_url,Trail.replayResponseHandler)

Trail.replayResponseHandler = (event) =>
    if (Browser)
      if event.target.readyState != 4 #Complete (!)
        return
      data = event.target.responseText
    else
      loader = air.URLLoader(event.target)
      data = loader.data
    AppReport("Replay started at node #{data}")
    valid = new RegExp("/replay/\\d+$")
    if (valid.test(data))
      replayid = new RegExp("\\d+$")
      @replayRunning = replayid.exec(data)
      #!!! replay_url = "pubsub.#{AppCtl.getOcServer()}#{data}"
      Trail.replay = new Trail.Replay(AppCtl.getOcServer(),data,Trail)
    else
      AppReport("Failed to start replay. Got: #{data}")

#
# Clear the canvas
#
Trail.clear = ->
  Trail.trailtrace('0:0:0').clear()

#
# Draw data by selecting a file
#
Trail.select = ->
  return if (Browser)
  f = new air.File("/home/meesern/Develpment/teaceremony.xml")
  try
    f.addEventListener(air.Event.SELECT, Trail.openData)
    f.browseForOpen("Open")
  catch error
    air.trace("Open Dialog Failed:", error.message)

Trail.openData = (event) ->
  AppReport("Open Dialog opening")
  Trail.file = event.target 
  Trail.drawdata()

#
# Save a PNG image of the canvas
#
Trail.save = ->
  return if (Browser)
  AppReport("Saving Image")
  strData = $('canvas')[0].toDataURL()
  #air.trace "nasty data: " + strData[0..80]
  #strData = strData.replace("data:image/png;base64,","")
  strData = strData[22..-1]
  data = decodeBase64(strData)
  #air.trace "nice data: " + encodeHex(data[0..10])
  Trail.data = new air.ByteArray
  for byte in data
    #air.trace byte.charCodeAt(0)
    Trail.data.writeByte(byte.charCodeAt(0))

  f = new air.File("/home/meesern/Develpment/image.png")
  try
    f.addEventListener(air.Event.SELECT, Trail.saveData)
    f.browseForSave("Save As")
  catch error
    air.trace("Save Dialog Failed:", error.message)
  #f.save(data)

Trail.saveData = (event) ->
    air.trace("Save Dialog saving")
    newFile = event.target 
    len = Trail.data.length
    air.trace len
    stream = new air.FileStream()
    stream.open(newFile, air.FileMode.WRITE)
    stream.writeBytes(Trail.data,0,len)
    stream.close()

#
# Draw the canvas from cloud data
#
Trail.download = ->
  @structureRequest = Trail.getHistory
  Trail.getStructure()

Trail.getStructure = ->
    AppReport("Fetching Item Structure")
    #Get all visible items
    Trail.getFromCloud("items", Trail.itemsCompleteHandler)
  
Trail.itemsCompleteHandler = (event) =>
    if (Browser)
      if event.target.readyState != 4 #Complete (!)
        return
      data = event.target.responseText
    else
      loader = air.URLLoader(event.target)
      data = loader.data
    #find all aspects
    doc =   $.parseXML(data)
    name = $(doc).find("items > name:contains('#{AppCtl.getItemName()}')")[0]
    AppReport("got #{name}")
    return unless name?
    aspects_xml = $(name).parent().find("aspects")
    AppReport("found #{aspects_xml.length} elements")
    @aspects = $.map( aspects_xml, (aspect, i) -> 
      $(aspect).find('id').text()
    )
    @structureRequest()

Trail.getHistory = ->
    @history_url = "counts/#{@aspects[0]}?grain=200" 
    @history_level = "all"
    Trail.getFromCloud(@history_url, Trail.historyCompleteHandler)

    AppReport("Fetching History & Data")
    Trail.loads = @aspects.length
    Trail.data = "<collection>"
    for aspect in @aspects
      #AppReport("Aspect id #{aspect}")
      Trail.getFromCloud("data/#{aspect}", Trail.dataCompleteHandler)

Trail.dataCompleteHandler = (event) =>
    if (Browser)
      if event.target.readyState != 4 #Complete (!)
        return
      data = event.target.response
    else
      loader = air.URLLoader(event.target)
      data = loader.data
    AppReport("Fetch Returned - more")
    Trail.data += data
    Trail.loads--
    if (Trail.loads <= 0)
      Trail.data += "</collection>"
      #AppReport("Trail data: #{Trail.data}")
      AppReport("Fetch Complete - plotting")
      Trail.visualise(Trail.data)

Trail.historyCompleteHandler = (event) =>
    AppReport("History Complete")
    if (Browser)
      if event.target.readyState != 4 #Complete (!)
        return
      data = event.target.response
    else
      loader = air.URLLoader(event.target)
      data = loader.data
    history = Trail.history_parse(data)
    if history.length == 1
      AppReport("Should not need to get more")
      return # Old code below
      stop = false
      switch @history_level
        when "all"
          @history_url+="/#{history[0][1]}"
          @history_level = "year"
        when "year"
          @history_url+="/#{history[0][2]}"
          @history_level = "day"
        when "day"
          @history_url+="/#{history[0][3]}"
          @history_level = "minute"
        when "minute"
          stop = true
          Trail.timeline.draw(history)
      AppReport(@history_url)
      Trail.getFromCloud(@history_url, Trail.historyCompleteHandler) unless stop
    else 
      Trail.timeline.draw(history)


Trail.putToCloud = (api, handler) ->
    this.requestOfCloud(api,handler,"POST")

Trail.getFromCloud = (api, handler) ->
    this.requestOfCloud(api,handler,"GET")

Trail.requestOfCloud = (api, handler, verb) ->
    url = "http://#{AppCtl.getOcServer()}:#{AppCtl.getPort()}/v1/#{api}"
    if (Browser)
      req = new XMLHttpRequest()
      req.open(verb,url,true)
      req.onreadystatechange = handler
      req.onprogress = progressHandler
      req.send()
    else
      #TODO - provide air support for post
      req = new air.URLRequest(url)
      loader = new air.URLLoader()
      configureListeners(loader, handler)
      try
        loader.load(req)
      catch error
        AppReport("Unable to load request")


Trail.drawdata = ->
  data = Trail.fileload()
  Trail.visualise(data)

Trail.fileload = (file) ->
  f = Trail.file
  fs = new air.FileStream
  fs.open(f,air.FileMode.READ)
  data = new air.ByteArray
  fs.readBytes(data,0,fs.bytesAvailable) #adobe-air is horrible!
  data

#
#Get Select a hue from the dtouch code
#
Trail.huefromcode = (code)->
  codepoints=code.split(':')
  color_hue = 60
  for a in codepoints
    color_hue += parseFloat(a)*42
  color_hue %= 255

Trail.history_parse = (data) ->
  AppReport(data)
  history_doc = $.parseXML(data)
  counts = $(history_doc).find('count')
  points = []
  counts.each( ->
    year = $(this).attr('year')
    day = $(this).attr('day')
    minute = $(this).attr('minute')
    second = $(this).attr('second')
    points.push([$(this).text(),year,day,minute,second])
  )
  AppReport("found #{points.length} counts like #{points[0]}")
  points


Trail.parse = (data, pstart, pend, type) ->
  AppReport("parsing data from #{pstart} to #{pend}")
  xs = []
  ys = []
  points = []
  Trail.doc ||= $.parseXML(data)
  #AppReport("got: #{Trail.doc}")
  @ments ||= $(Trail.doc).find('marker')
  AppReport("found #{@ments.length} elements")
  return if (@ments.length == 0)
  if (Trail.points.length == 0)
    lasttime = []
    @ments.each( ->
      marker = $(this)
      time = marker.parent().attr('t')
      code = marker.attr('code')
      tstamp = marker.attr('timestamp') #time only from xml
      x1 = parseFloat(marker.attr('x1'))
      x2 = parseFloat(marker.attr('x2'))
      y1 = parseFloat(marker.attr('y1'))
      y2 = parseFloat(marker.attr('y2'))
      xs.push(x1)
      ys.push(y1)
      xs.push(x2)
      ys.push(y2)
      Trail.points.push([x1,y1,x2,y2,code,time,tstamp])
      if (lasttime[code] != tstamp)
        lasttime[code] = tstamp
        Trail.positions.push([x1,y1,x2,y2,code,time,tstamp])
      return true
    )
    #xs = [10,20,30,40,50]
    #ys = [10,20,30,40,50]
    Trail.set_scale(xs,ys) unless Trail.extend

  ts = new Date(pstart)
  te = new Date(pend)
  if (type == 'points')
    thelot = Trail.points
  else
    thelot = Trail.positions
  for i in [0..(thelot.length-1)]
    point = thelot[i]
    time = point[5]
    t = new Date(time)
    tmte = t-te
    tmts = t-ts
    #if (tmte >= 0)
    #  return false
    if (tmts > 0 and tmte < 0)
      points.push(point)
  AppReport("found #{points.length} points")
  return unless points.length > 0
  points

Trail.visualise = (data, pstart=0, pend=new Date()) ->
  if (AppCtl.getOBox() == 1)
    Trail.draw_boxes(data, pstart, pend)
  if (AppCtl.getOCorner() == 1)
    Trail.draw_corners(data, pstart, pend)
  if (AppCtl.getOfCorner() == 1)
    Trail.draw_first_corners(data, pstart, pend)


#Draw boxes
Trail.draw_boxes = (data, pstart, pend) ->
  points = Trail.parse(data, pstart, pend,'points')
  if points?
    for i in [0..(points.length-1)]
      #AppReport("marking #{i}")
      Trail.markout(points[i])
  AppReport("parsed")

# 
# visualise bounding box first corner at any one time
#
Trail.draw_first_corners = (data, pstart, pend) ->
  AppReport("Parsing")
  points = null
  points = Trail.parse(data, pstart, pend,'positions')
  AppReport("Drawing")
  #now we have each point but the corners look like movement
  #if we plot them directly.  Next simplest is to choose only the 
  #first point in any timeframe.
  if points?
    for i in [0..(points.length-1)]
        #AppReport("marking #{i}")
        Trail.markout_trail(points[i])
  AppReport("Drawn")

#
# visualise all bounding box corners
#
Trail.draw_corners = (data, pstart, pend) ->
  points = Trail.parse(data, pstart, pend,'points')
  #now we have each point but the corners look like movement
  #if we plot them directly.  Next simplest is to choose only the 
  #first pont in any timeframe.
  for i in [0..(points.length-1)]
    #AppReport("marking #{i}")
    Trail.markout_trail(points[i])
  AppReport("parsed")

# Control callbacks from timeline
# Draw a proportion of the total history
Trail.draw_part = (pstart, pend)->
  Trail.visualise(Trail.data, pstart, pend)

# Called from replay
Trail.stream_in = (message) ->
  AppReport("Stream Data")
  #Trail.rpstream = $(Trail.rpstream).append(message)
  ##!!!! This is a loony step, but I can't find another way
  #data = (new XMLSerializer()).serializeToString(Trail.rpstream[0])
  Trail.freshdata()
  #Trail.clear()
  rpstream = $(Trail.rpstream).append(message)
  data = (new XMLSerializer()).serializeToString(rpstream[0])
  Trail.extend = true
  Trail.visualise(data)
  Trail.extend = false

configureListeners = (dispatcher, complete) ->
    dispatcher.addEventListener(air.Event.COMPLETE, complete)
    dispatcher.addEventListener(air.Event.OPEN, openHandler)
    dispatcher.addEventListener(air.ProgressEvent.PROGRESS, progressHandler)
    dispatcher.addEventListener(air.SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler)
    dispatcher.addEventListener(air.HTTPStatusEvent.HTTP_STATUS, httpStatusHandler)
    dispatcher.addEventListener(air.IOErrorEvent.IO_ERROR, ioErrorHandler)

openHandler = (event) ->
    AppReport("openHandler: " + event)


progressHandler = (event) ->
  #AppReport("progressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal)
    AppReport("progressHandler loaded:" + event.loaded + " total: " + event.total)


securityErrorHandler = (event) ->
    AppReport("securityErrorHandler: " + event)


httpStatusHandler = (event) ->
    AppReport("httpStatusHandler: " + event)


ioErrorHandler = (event) ->
    AppReport("ioErrorHandler: " + event)

