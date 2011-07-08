// User interactions on index page can go here
// define global object
PSUi = {};

//Switch air/titanium off in one go so that we can test in the browser
//Browser = true;
Browser = false;

if(Browser)
{
  exports = window;
};


PSUi.Loaded = function()
{
    AppReport("*** DOM loaded ***");

    //Button click
    $('#b_go').click(exports.draw);
    $('#b_sav').click(exports.save);
    $('#b_clr').click(exports.clear);

    // better if DRYer
    $('#item').attr('value',AppCtl.getItemName());
    $('#item').change(function(){AppCtl.setItemName($('#item').attr('value'))});

    $('#server').attr('value',AppCtl.getOcServer());
    $('#server').change(function(){AppCtl.setOcServer($('#server').attr('value'))});

    $('#port').attr('value',AppCtl.getPort());
    $('#port').change(function(){AppCtl.setPort($('#port').attr('value'))});

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
    exports.init();
};


function AppReport(message)
{
  //$("<p>"+message+"</p>").appendTo('#status')
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

