// define global object
PSUi = {};

// User interactions on index page can go here

PSUi.Loaded = function()
{
    air.trace("*** DOM loaded ***");

    //Button click
    //$('#b1').click(exports.download);
    $('#b2').click(exports.save);
    
    //Add configuration options
    var cfg = $('#oc-config-content');

    cfg.append("\
    <fieldset>  \
    <legend> JID: Name@Server </legend> \
      <p><label> Name </label> <input id='dest' type=text name=dest/></p> \
      <p><label> Server Name </label> <input id='server' type=text name=server/></p> \
    </fieldset> \
    <fieldset>  \
    <legend> HTTP Port </legend> \
      <p><label> Port </label> <input id='port' type=text name=port/></p> \
    </fieldset> \
    ");

    $('#dest').attr('value',AppCtl.getOcDest());
    $('#dest').change(function(){AppCtl.setOcDest($('#dest').attr('value'))});
    $('#server').attr('value',AppCtl.getOcServer());
    $('#server').change(function(){AppCtl.setOcServer($('#server').attr('value'))});

    $('#port').attr('value',AppCtl.getPort());
    $('#port').change(function(){AppCtl.setPort($('#port').attr('value'))});

    AppReport("Creating Canvas");
    exports.init();
};


function AppReport(message)
{
  //$("<p>"+message+"</p>").appendTo('#status')
  //air.Introspector.Console.log(message);
  air.trace(message);
}

