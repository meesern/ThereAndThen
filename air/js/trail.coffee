#
# Coffescript Flow Visualiser view.
#
# Compile to javascript with coffee
#

#Trail = this ? exports
#Air does not seem to use commonjs
Trail = exports

class TrailTrace
  constructor: (canvas, @color, @maxX, @maxY, @maxRadius = 80) ->
    @ctx = canvas.getContext "2d"
    @minRadius = 1.5
    @x = @y = 0
    @distance = 0

    @radius = @minRadius


  #points must be presented in order
  #points are in canvas coordinates (pixels)
  mark: (x,y) ->
    dx = x - @x
    dy = y - @y
    @x = x
    @y = y
    @distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))

    this.draw()

  draw: ->
    this.flow()
    this.stretch()
    this.circle(@x, @y, @radius) unless @radius == @maxRadius

  flow: ->
    @radius = @radius * 1.01
    @radius = @maxRadius if @radius > @maxRadius

  stretch: ->
    return if @distance < 2
    strtch = @distance / 10
    @radius = @radius / (1+strtch)
    @radius = @minRadius if @radius < @minRadius

  circle: (x,y,r)->
    #AppReport("circle #{x},#{y},#{r}")
    @ctx.beginPath()
    @ctx.strokeStyle = "rgba(255,255,255,0.33)"
    @ctx.fillStyle = "rgba(80,80,80,0.02)"
    @ctx.arc(x, y, r, 0, Math.PI * 2, false)
    @ctx.stroke()
    @ctx.fill()
    @ctx.closePath()


Trail.init = -> 
  canvas = document.createElement('canvas')
  Trail.maxY = 400.0
  Trail.maxX = 600.0
  canvas.height = Trail.maxY
  canvas.width = Trail.maxX
  $('#tracker').append(canvas)
  Trail.trailtrace = new TrailTrace($('canvas')[0],'rgb(255,255,255)'
                         canvas.width, canvas.height)
  #Trail.parse("")

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
    Trail.scale = (Trail.maxX - (80*2)) / xrange
  else
    Trail.scale = (Trail.maxY - (80*2)) / yrange

  Trail.xcentering = (Trail.maxX - (xrange*Trail.scale))/2 
  Trail.ycentering = (Trail.maxY - (yrange*Trail.scale))/2 

  AppReport("Scale: #{Trail.scale} bigx: #{bigx} smallx: #{smallx}")


Trail.markout = (x,y) ->
  Trail.trailtrace.mark(Trail.xcentering+(x+Trail.xoffset)*Trail.scale, 
                        Trail.ycentering+(y+Trail.yoffset)*Trail.scale)


Trail.download = ->
  AppReport("Fetching Data")
  #aspect is bogus
  req = new air.URLRequest("http://greenbean:3000/data/1")
  loader = new air.URLLoader()
  configureListeners(loader)
  try
    loader.load(req)
  catch error
    air.trace("Unable to load request")

Trail.parse = (data) ->
  AppReport("parsing data")
  xs = []
  ys = []
  Trail.doc = $.parseXML(data)
  AppReport("got: #{Trail.doc}")
  ments = $(Trail.doc).find('ment')
  AppReport("found #{ments.length} elements")
  ments.each( ->
    x = parseFloat($(this).find('lon:first').text())
    y = parseFloat($(this).find('lat:first').text()) 
    xs.push(x)
    ys.push(y)
  )
  AppReport("found #{xs.length} points")
  return unless xs.length > 0

  #xs = [10,20,30,40,50]
  #ys = [10,20,30,40,50]
  Trail.set_scale(xs,ys)
  for i in [0..(xs.length-1)]
    #AppReport("marking #{i}")
    Trail.markout(xs[i], ys[i])
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
    Trail.parse(loader.data)


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

