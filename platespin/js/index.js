// User interactions on index page can go here
// define global object
PSUi = {};

//Switch air/titanium off in one go so that we can test in the browser
Browser = true;
//Browser = false;

if(Browser)
{
  exports = window;
};


PSUi.Loaded = function()
{
    AppReport("*** DOM loaded ***");

    //Button click
    $('#b_go').click(exports.draw);
    $('#b_ani').click(exports.animate);
    $('#b_run').click(exports.replay);
    $('#b_stp').click(exports.stop);
    $('#b_sav').click(exports.save);
    $('#b_clr').click(exports.clear);

    // better if DRYer
    $('#item').attr('value',AppCtl.getItemName());
    $('#item').change(function(){AppCtl.setItemName($('#item').attr('value'))});

    $('#server').attr('value',AppCtl.getOcServer());
    $('#server').change(function(){AppCtl.setOcServer($('#server').attr('value'))});

    $('#port').attr('value',AppCtl.getPort());
    $('#port').change(function(){AppCtl.setPort($('#port').attr('value'))});

    $('#rate').attr('value',AppCtl.getRate());
    $('#rate').change(function(){AppCtl.setRate($('#rate').attr('value'))});

    $('#gskip').attr('value',AppCtl.getSkip());
    $('#gskip').change(function(){AppCtl.setSkip($('#gskip').attr('value'))});

    $('#dsfile').attr('checked',AppCtl.getDsFile());
    $('#dsfile').change(function(){AppCtl.setDsFile($('#dsfile').attr('checked'))});

    $('#dscloud').attr('checked',AppCtl.getDsCloud());
    $('#dscloud').change(function(){AppCtl.setDsCloud($('#dscloud').attr('checked'))});

    $('#obox').attr('checked',AppCtl.getOBox());
    $('#obox').change(function(){AppCtl.setOBox($('#obox').attr('checked'))});

    $('#ocorner').attr('checked',AppCtl.getOCorner());
    $('#ocorner').change(function(){AppCtl.setOCorner($('#ocorner').attr('checked'))});

    $('#ofcorner').attr('checked',AppCtl.getOfCorner());
    $('#ofcorner').change(function(){AppCtl.setOfCorner($('#ofcorner').attr('checked'))});

    AppReport("Creating Canvas");
    exports.scrollable = true;
    exports.init();
    //d3play();
};

function createBoundedWrapper(object, method)
{
  return function() {
    return method.apply(object, arguments);
  };
}

function AppReport(message)
{
  $("<p>"+htmlEntities(message)+"</p>").appendTo('#status')
  if (exports.scrollable)
  {
    exports.scrollable = false
    setTimeout("scrollStatus()",1000);
  }

  if (Browser)
  {
    console.log(message);
  }
  else
  {
    //air.Introspector.Console.log(message);
    air.trace(message);
  }
}


/*Scrolling is expensive so only once a second */
function scrollStatus()
{
  $('#status').scrollTop($('#status')[0].scrollHeight);
  exports.scrollable = true;
}

function d3play()
{
  var data = [4, 8,15, 16, 23, 42];
  var w = 80;
  var h = 20;

  var chart = d3.select("#history").append("svg:svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);

  var x = d3.scale.linear()
            .domain([0,1])
	    .range([0,w]);

  /*
  var y = d3.scale.ordinal()
            .domain(data)
	    .rangeBands([0,120]);
	    */
  var y = d3.scale.linear()
            .domain([0,100])
	    .rangeRound([0,h]);
  
  /* the bars */
  chart.selectAll("rect")
    .data(data)
   .enter().append("svg:rect")
    .attr("x", function(d,i) {return x(i) - 0.5; })
    .attr("y", function(d,i) {return h - y(d) - 0.5; })
    .attr("width", w)
    .attr("height", function(d) {return y(d); });
  /* the axis */
  chart.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - 0.5)
    .attr("y2", h - 0.5)
    .attr("stroke", "#000");
}

/* Sadly have to hack in our own for javascript */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Need this to re-establish the context - sadly no breakpoints from here */
function Replay_on_connect(status) {
  return exports.replay.on_connect(status);
};
function Replay_on_event(message) {
  return exports.replay.on_event(message);
};
function Replay_on_subscribe(message) {
  return exports.replay.on_subscribe(message);
};

