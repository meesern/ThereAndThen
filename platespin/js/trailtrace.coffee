#
# Coffescript Flow Visualiser view.
#
# Compile to javascript with coffee
#
# This class is mostly about drawing on canvas
#

root= exports ? this

class root.TrailTrace
  constructor: (canvas, @maxX, @maxY, @speed=1.01, @maxRadius = 80, @hue=0) ->
    @color = "rgba(255,255,255,0.33)"
    @ctx = canvas.getContext "2d"
    @minRadius = 1.5
    @x = @y = 0
    @distance = 0
    @radius = @minRadius

  # = makes this a class method
  clear: ->
    @ctx.fillStyle = 'rgba(0,0,0,0.0)'
    @ctx.clearRect(0,0,@maxX,@maxY) 
    @ctx.fillRect(0,0,@maxX,@maxY) 


  #points must be presented in order
  #points are in canvas coordinates (pixels)
  squaremark: (x1, y1, x2, y2, xhue) ->
    @ctx.beginPath()
    @ctx.lineWidth = 2
    stroke = "hsla(#{@hue},95%,80%,0.25)"
    @ctx.strokeStyle = stroke
    @ctx.fillStyle = "rgba(0,0,0,0)"
    @ctx.moveTo(x1,y1)
    @ctx.lineTo(x1,y2)
    @ctx.lineTo(x2,y2)
    @ctx.lineTo(x2,y1)
    @ctx.lineTo(x1,y1)
    #@ctx.shadowColor = stroke
    #@ctx.shadowBlur = 4
    @ctx.stroke()
    @ctx.fill()
    @ctx.closePath()

  mark: (x,y,xhue) ->
    @color = "hsla(#{@hue},100%,70%,0.6)"
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
    @radius = @radius * @speed
    @radius = @maxRadius if @radius > @maxRadius

  stretch: ->
    return if @distance < 2
    strtch = @distance / 10
    @radius = @radius / (1+strtch)
    @radius = @minRadius if @radius < @minRadius

  circle: (x,y,r)->
    #AppReport("circle #{x},#{y},#{r}")
    @ctx.beginPath()
    @ctx.lineWidth = 2
    @ctx.strokeStyle = @color 
    @ctx.fillStyle = "rgba(80,80,80,0.02)"
    @ctx.arc(x, y, r, 0, Math.PI * 2, false)
    @ctx.stroke()
    @ctx.fill()
    @ctx.closePath()


