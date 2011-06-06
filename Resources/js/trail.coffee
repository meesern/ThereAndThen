#
# Coffescript Flow Visualiser view.
#
# Compile to javascript with coffee
#

Trail = this ? exports

$(document).ready(->Trail.init())

class TrailTrace
  constructor: (canvas, @color, @maxX, @maxY, @maxRadius = 80) ->
    @grx = canvas.getContext "2d"
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
    stretch = @distance / 10
    @radius = @radius / (1+stretch)
    @radius = @minRadius if @radius < @minRadius

  circle = (x,y,r)->
    @ctx.beginPath()
    @ctx.strokeStyle = "rgba(0,0,0,0.05)"
    @ctx.fillStyle = "rgba(255,255,255,0.02)"
    @ctx.arc(x, y, r, 0, Math.PI * 2, false)
    @ctx.stroke()
    @ctx.fill()
    @ctx.closePath()


Trail.init = -> 
  canvas = document.createElement('canvas')
  Trail.maxY = 400
  Trail.maxX = 900
  canvas.height = Trail.maxY
  canvas.width = Trail.maxX
  $('#tracker').append(canvas)
  Trail.trailtrace = new TrailTrace($('canvas'),'rgb(255,255,255)'
                         canvas.width, canvas.height)

#find the maximum x and y and figure out the canvas scale
#receive and array of all x's and and array of all y's
Trail.scale(xs, ys) = -> 
  bigx = 1
  smallx = Trail.maxX
  bigy = 1
  smally = Trail.maxY

  for x of xs 
    bigx = x if x > bigx
    smallx = x if x < smallx

  for y of ys 
    bigx = y if y > bigy
    smallx = y if y < smally

  xrange = bigx - smallx
  yrange = bigy - smally

  data_longness = xrange / yrange
  canvas_longness = Trail.maxX / Trail.maxY

  if data_longness > canvas_longness
    Trail.scale = xrange / Trail.maxX
  else
    Trail.scale = yrange / Trail.maxY


Trail.markout(x,y) = ->
  Trail.trailtrace.mark(x * Trail.scale, y1 * Trail.scale)


