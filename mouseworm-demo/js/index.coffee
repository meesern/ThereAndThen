#
# Coffescript Flow Visualiser view.
#
# Compile to javascript with coffee
#

Index = this

$(document).ready(->Index.init())

Index.init = -> 
  canvas = document.createElement('canvas')
  canvas.height = 400
  canvas.width = 900
  $('#tracker').append(canvas)
  
  Index.canvas = $('canvas')
  Index.ctx = canvas.getContext "2d"
  Index.nowX = 0
  Index.nowY = 0
  Index.minRadius = 1.5
  Index.maxRadius = 80
  Index.distance = 0.0
  Index.radius = Index.minRadius

  #do not understand why jquery's mousemove method stopped being recognised
  #(firefox 4)
  Index.canvas.bind('mousemove', (e)->Index.mousemove(e))
  Index.canvas.bind('mouseenter', (e)->Index.mouseenter(e))
  Index.canvas.bind('mouseleave', (e)->Index.mouseleave(e))

Index.mouseenter = (e)->
  Index.tick = setInterval("this.mark()", 25)

Index.mouseleave = (e)->
  clearInterval(Index.tick)

Index.mousemove = (e)->
  pos = Index.canvas.position()
  x = e.pageX - pos.left
  y = e.pageY - pos.top
  dx = x - Index.nowX
  dy = y - Index.nowY
  Index.nowX = x
  Index.nowY = y 
  Index.distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))
  
Index.mark = ->
  Index.flow()
  Index.stretch()
  Index.circle(Index.nowX, Index.nowY, Index.radius) unless Index.radius == Index.maxRadius

Index.flow = ->
  Index.radius = Index.radius * 1.01
  Index.radius = Index.maxRadius if Index.radius > Index.maxRadius

Index.stretch = ->
  return if Index.distance < 2
  stretch = Index.distance / 10
  Index.radius = Index.radius / (1+stretch)
  Index.radius = Index.minRadius if Index.radius < Index.minRadius

Index.circle = (x,y,r)->
  Index.ctx.beginPath()
  Index.ctx.strokeStyle = "rgba(0,0,0,0.05)"
  Index.ctx.fillStyle = "rgba(255,255,255,0.02)"
  Index.ctx.arc(x, y, r, 0, Math.PI * 2, false)
  Index.ctx.stroke()
  Index.ctx.fill()
  Index.ctx.closePath()



