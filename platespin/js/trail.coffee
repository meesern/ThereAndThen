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
  Trail.trailtrace = new Trail.TrailTrace($('canvas')[0],
                         canvas.width, canvas.height, 1.08)
  #Trail.drawdata()

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
  col = point[4]
  #cannot get coffeescript to handle multiple lines here!
  Trail.trailtrace.squaremark( Trail.xcentering+(x1+Trail.xoffset)*Trail.scale, Trail.ycentering+(y1+Trail.yoffset)*Trail.scale, Trail.xcentering+(x2+Trail.xoffset)*Trail.scale, Trail.ycentering+(y2+Trail.yoffset)*Trail.scale, col)

Trail.markout_trail = (point) ->
  x1 = point[0]
  y1 = point[1]
  x2 = point[2]
  y2 = point[3]
  col = point[4]
  #AppReport("point #{x1}, #{y1}")
  #cannot get coffeescript to handle multiple lines here!
  Trail.trailtrace.mark( Trail.xcentering+(x1+Trail.xoffset)*Trail.scale, Trail.ycentering+(y1+Trail.yoffset)*Trail.scale, col)

Trail.select = ->
  f = new air.File("/home/meesern/Develpment/teaceremony.xml")
  try
    f.addEventListener(air.Event.SELECT, Trail.openData)
    f.browseForOpen("Open")
  catch error
    air.trace("Open Dialog Failed:", error.message)

Trail.openData = (event) ->
  air.trace("Open Dialog opening")
  Trail.file = event.target 
  Trail.drawdata()

Trail.save = ->
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

Trail.download = ->
  for aspect in ["60","62","64"]
    AppReport("Fetching Data")
    Trail.loads = 0
    Trail.data = "<collection>"
    req = new air.URLRequest("http://greenbean:3000/v1.0/data/#{aspect}")
    loader = new air.URLLoader()
    configureListeners(loader)
    try
      loader.load(req)
    catch error
      air.trace("Unable to load request")

Trail.drawdata = ->
  data = Trail.fileload()
  Trail.parse_squares(data)

Trail.fileload = (file) ->
  f = Trail.file
  fs = new air.FileStream
  fs.open(f,air.FileMode.READ)
  data = new air.ByteArray
  fs.readBytes(data,0,fs.bytesAvailable) #adobe-air is horrible!
  data

Trail.parse = (data) ->
  AppReport("parsing data")
  xs = []
  ys = []
  points = []
  Trail.doc = $.parseXML(data)
  #AppReport("got: #{Trail.doc}")
  ments = $(Trail.doc).find('marker')
  AppReport("found #{ments.length} elements")
  ments.each( ->
    code = $(this).attr('code')
    time = $(this).attr('timestamp')
    x1 = parseFloat($(this).attr('x1'))
    x2 = parseFloat($(this).attr('x2'))
    y1 = parseFloat($(this).attr('y1'))
    y2 = parseFloat($(this).attr('y2'))
    xs.push(x1)
    ys.push(y1)
    xs.push(x2)
    ys.push(y2)
    codepoints=code.split(':')
    color_hue = 60
    for a in codepoints
      color_hue += parseFloat(a)*42
    color_hue %= 255
    points.push([x1,y1,x2,y2,color_hue])
  )

  AppReport("found #{points.length} points")
  return unless points.length > 0

  #xs = [10,20,30,40,50]
  #ys = [10,20,30,40,50]
  Trail.set_scale(xs,ys)
  points

Trail.parse_squares = (data) ->
  points = Trail.parse(data)
  for i in [0..(points.length-1)]
    #AppReport("marking #{i}")
    Trail.markout(points[i])
  AppReport("parsed")

Trail.parse_trail = (data) ->
  points = Trail.parse(data)
  for i in [0..(points.length-1)]
    #AppReport("marking #{i}")
    Trail.markout_trail(points[i])
  AppReport("parsed")

configureListeners = (dispatcher) ->
    dispatcher.addEventListener(air.Event.COMPLETE, completeHandler)
    dispatcher.addEventListener(air.Event.OPEN, openHandler)
    dispatcher.addEventListener(air.ProgressEvent.PROGRESS, progressHandler)
    dispatcher.addEventListener(air.SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler)
    dispatcher.addEventListener(air.HTTPStatusEvent.HTTP_STATUS, httpStatusHandler)
    dispatcher.addEventListener(air.IOErrorEvent.IO_ERROR, ioErrorHandler)

completeHandler = (event) ->
    AppReport("Fetch Complete")
    loader = air.URLLoader(event.target)
    Trail.data += loader.data
    Trail.loads++
    if (Trail.loads >= 3)
      Trail.data += "</collection>"
      #AppReport("Trail data: #{Trail.data}")
      Trail.parse_trail(Trail.data)


openHandler = (event) ->
    air.trace("openHandler: " + event)


progressHandler = (event) ->
    air.trace("progressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal)


securityErrorHandler = (event) ->
    air.trace("securityErrorHandler: " + event)


httpStatusHandler = (event) ->
    air.trace("httpStatusHandler: " + event)


ioErrorHandler = (event) ->
    air.trace("ioErrorHandler: " + event)

