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

class root.TimeLine
  constructor: (@replay_url, @observer) ->
    #set up drawing parameters
    @axis_color = ""
  
  clear: ->
    @chart.selectAll('*').remove()


