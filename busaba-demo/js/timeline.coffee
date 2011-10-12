#
# Coffescript History Visualiser view.
#
# Compile to javascript with coffee
#
# This class is mostly about drawing on canvas
#
# Drawing directly on the canvas is a bit murky 
# turtle graphics helps tidy the code but d3 and 
# svg is crisper and more concise.  I leave the 
# original as TimeLineCanvas for reference.

root= exports ? this

class root.TimeLineCanvas
  constructor: (@canvas, @maxX, @maxY) ->
    @pen = new Pen(@canvas)
    @color = "rgba(255,255,255,0.33)"
    @ctx = @canvas.getContext "2d"

    #set up drawing parameters
    @axis_color = "hsla(0,1%,50%,1)"
    @axis_height = 8
    @axis_indent = 8
    @tick_len = 4
    @y_axis_len = 20
    @axis_thickness = 3
    @tick_thickness = 1

    #set up drawing relationships
    @x_axis_len = @maxX - 2*@axis_indent
    @x_axis_level = @maxY - @axis_height
  
  clear: ->
    @ctx.fillColor = 'rgba(0,0,0,1)'
    @ctx.clearRect(0,0,@maxX,@maxY) 
    @ctx.fillRect(0,0,@maxX,@maxY) 

  #draw axis
  frame: ->
    @ctx.save()
    @ctx.lineWidth = @axis_thickness
    @ctx.lineCap = "round"
    @ctx.strokeStyle = @axis_color
    @ctx.beginPath()
    #Draw the X-axis
    @ctx.moveTo(@axis_indent, @x_axis_level)
    @ctx.lineTo(@axis_indent+@x_axis_len, @x_axis_level)
    #Draw the Y-axis
    @ctx.moveTo(@axis_indent, @x_axis_level)
    @ctx.lineTo(@axis_indent, @x_axis_level-@y_axis_len)
    @ctx.moveTo(@axis_indent+@x_axis_len, @x_axis_level)
    @ctx.lineTo(@axis_indent+@x_axis_len, @x_axis_level-@y_axis_len)
    #Draw it
    @ctx.stroke()
    @ctx.closePath()
    @ctx.restore()
    #Draw ticks
    @pen.penstyle(@axis_color)
    @pen.jump(@axis_indent,@x_axis_level)
    for i in [1..12]
      @pen.pendown().down(4).draw().penup().up(4).right(@x_axis_len/11)
    #test
    #this.draw([1,2,3,4,5,6])

  draw: (data)->
    fitdata = this.rescale(data,@y_axis_len)
    @pen.penstyle("hsla(0,70%,60%,1)")
    @pen.jump(@axis_indent,@x_axis_level)
    points = data.length
    penwidth = (@x_axis_len-@axis_thickness)/points
    @pen.pensize(penwidth)
    @pen.penup().right((penwidth/2)+1)
    for d in fitdata
      @pen.pendown().up(d).draw().penup().down(d).right(penwidth)

  #data is an array of array of value and metadata
  #[[<val>,<year>,<yday>,<dmin>],...]
  rescale: (data, scalemax) ->
    #ditch the stuff that's not raw value (temp)
    data = data.map( (p) ->
      p[0]
    )
    datamax = Math.max.apply(Math, data)
    AppReport("datamax #{datamax}")
    data.map( (p) ->
      p*scalemax/datamax
    )


#
# Timeline implementation based on SVG and D3
#
class root.TimeLine
  constructor: (@selector, @maxX, @maxY, @observer) ->

    #set up drawing parameters
    @axis_color = "hsla(0,1%,50%,1)"
    @graphHeight = 40
    @divHeight = @graphHeight + 4
    @graphWidth = @maxX
    @barWidth = 4
    @maxSamples = Math.floor(@graphWidth/@barWidth)
    @chart = d3.select(@selector).append("svg:svg")
      .attr("class", "chart")
      .attr("height", @divHeight)
    @animationStep = 2
    @closeness = 2
    @aniWidth = 10
    @animationInterval = 150
    @animationStop = @maxX
  
  clear: ->
    @chart.selectAll('*').remove()

  animate: ->
    AppReport("Theta Replay")
    clearInterval(@animationId) if @animationId?
    this.ani_region_start()
    @animationId = setInterval(this.ani_frame, @animationInterval)

  #draw axis
  frame: ->

  #data is an array of array of value and metadata
  #[[<val>,<year>,<yday>,<dmin>,<sec>],...]
  draw: (data)->
    this.clear()

    data = this.mush(data, @maxSamples)
    #[[<val>,<date>,<date>],[<val>,<date>,<date>]...
    dmin = d3.min(data, (d) ->
      parseFloat(d[0]))
    dmax = d3.max(data, (d) ->
      parseFloat(d[0]))

    x = d3.scale.linear()
              .domain([0,1])
              .range([0,@barWidth])

    y = d3.scale.linear()
              .domain([dmin, dmax])
              .rangeRound([0,@graphHeight])

    @tscale = d3.scale.linear()
              .domain([0,@graphWidth])
              .range([data[0][1].getTime(),data[data.length-1][2].getTime()])
    
    @chart.attr("width", @barWidth * data.length - 1)

    # the bars 
    @chart.selectAll("rect")
      .data(data)
     .enter().append("svg:rect")
      .attr("x", (d,i) => 
         x(i) - 0.5 )
      .attr("y", (d,i) => 
         @divHeight - y(d[0]) - 0.5 )
      .attr("width", @barWidth)
      .attr("height", (d) -> 
        y(d[0]))
    # the axis 
    @chart.append("svg:line")
      .attr("x1", 0)
      .attr("x2", @barWidth * data.length)
      .attr("y1", @divHeight - 0.5)
      .attr("y2", @divHeight - 0.5)
      .attr("stroke", "#CCC")

    myregionstart = createBoundedWrapper(this,this.mouse_region_start)
    myregionend = createBoundedWrapper(this,this.mouse_region_end)
    @chart.on('mousedown', -> 
           myregionstart(this)
      )
      .on('mouseup', -> 
           myregionend(this)
      )


  #[[<val>,<year>,<yday>,<dmin>],...]
  #....
  #[[<val>,<earliest>,<latest>],...]
  mush: (data, size) ->
    sfrac = start = middle = end = di = 0
    d = []
    datastep = data.length / size
    for [1..size]
      early = this.datefromdata(data[di])
      mcount = Math.floor(datastep-sfrac)
      efrac  = datastep - mcount - sfrac
      s = parseFloat(data[di][0]) * sfrac
      di++ unless sfrac == 0
      m=0
      while mcount--
        m += parseFloat(data[di++][0])
      if efrac != 0
        e = parseFloat(data[di][0]) * efrac 
      else
        e = 0
      late = this.datefromdata(data[di])
      d.push([s+m+e,early,late])
      sfrac = Math.min((1 - efrac),datastep)
    d

  #[<val>,<year>,<yday>,<dmin>,<sec>]  
  #....
  # Date object
  datefromdata: (point)->
    new Date(point[1],null,point[2],null,point[3],point[4])

  ani_region_start: ->
    @animationPos = 0
    this.ani_frame()

  ani_frame: =>
    this.region_start([@animationPos,0])
    @animationPos = @animationPos + @animationStep
    this.region_extend([@animationPos,0])
    this.region_end()
    if @animationPos > @animationStop
      clearInterval(@animationId)

  #Select a region of history to display
  mouse_region_start: (event,d,i)->
    xy = d3.svg.mouse(event)
    this.region_start(xy,d,i)
    myregionextend = createBoundedWrapper(this,this.mouse_region_extend)
    @chart.on('mousemove', -> 
           myregionextend(this)
      )
    #need jquery for mouseleave event (mouseout too bubbly)
    myregionend = createBoundedWrapper(this,this.mouse_region_end)
    $("#{@selector} > svg").mouseleave( ->
           myregionend(this)
      )

  #mouse independent for animation
  region_start: (xy)->
    @roldx1 = @rx1
    @roldx2 = @rx2
    if (Math.abs(xy[0]-@rx1) < @closeness and @sel)
      #grab and extend @rx1
      @handle = 'start'
      @rx1 = xy[0]
    else if (Math.abs(xy[0]-@rx2) < @closeness and @sel)
      #grab and extend @rx2
      @handle = 'end'
      @rx2 = xy[0]
      if (@rx2 - @rx1 > @aniWidth)
        @rx1 = @rx2 - @aniWidth
    else
      @rx1 = @rx2 = xy[0]
      @handle = 'new'
    #AppReport("Mouse x is #{@rx1}")
    @sel ?= @chart.append("svg:rect") 
    @sel.attr('id','selection')
      .attr("x", @rx1)
      .attr("y", 0 )
      .attr("width", @rx2-@rx1)
      .attr("height", @divHeight)

  mouse_region_extend: (event) ->
    xy = d3.svg.mouse(event)
    this.region_extend(xy)

  region_extend: (xy) ->
    if @handle == 'start'
      @rx1 = xy[0]
    else
      @rx2 = xy[0]
    [@rx2,@rx1] = [@rx1,@rx2] if @rx2 < @rx1
    #AppReport("Mouse x moving #{@rx2}")
    d3.select("#selection")
      .attr("x", @rx1)
      .attr("width",@rx2-@rx1)

  mouse_region_end: (event) ->
    @chart.on('mousemove', null)
    $("#{@selector} > svg").unbind('mouseleave')
    this.region_end()

  region_end: () ->
    #AppReport("x now #{@rx2}")
    if @rx2 - @rx1 > 1
      @observer.clear()
      from = this.timeatpos(@rx1)
      to = this.timeatpos(@rx2)
      @observer.draw_part(from,to)

  timeatpos: (x) ->
    #javascript dates are horrible
    # @tscale(x) is in UTC but Date parses in local time
    # so we have to remove the minute offset in ms 
    d = new Date(@tscale(x))
    d.setTime(@tscale(x) - (d.getTimezoneOffset() * 60000))
    d



