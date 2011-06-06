// define global object
TaTUi = {};

// User interactions on index page can go here

TaTUi.Loaded = function()
{
    Titanium.API.log("*** DOM loaded ***");

    //Add configuration options
    var cfg = $('#oc-config-content');

    cfg.append("\
    <fieldset> \
    <legend> Reporting Type </legend> \
      <p><label> <input id='xmpp-radio' type=radio name=type/> XMPP </label></p> \
      <p><label> <input id='html-radio' type=radio name=type/> HTML </label></p> \
    </fieldset> \
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

    var sel = (AppCtl.getReportType() == 'xmpp')?'#xmpp-radio':'#html-radio'
    $(sel).attr('checked','true');

    $('#xmpp-radio').change(function(){TaTUi.ReportType('xmpp')});
    $('#html-radio').change(function(){TaTUi.ReportType('html')});

    $('#dest').attr('value',AppCtl.getOcDest());
    $('#dest').change(function(){AppCtl.setOcDest($('#dest').attr('value'))});
    $('#server').attr('value',AppCtl.getOcServer());
    $('#server').change(function(){AppCtl.setOcServer($('#server').attr('value'))});

    $('#port').attr('value',AppCtl.getPort());
    $('#port').change(function(){AppCtl.setPort($('#port').attr('value'))});

    AppReport("Creating Canvas");
    Trail.init()

};




function AppReport(message)
{
  $("<p>"+message+"</p>").appendTo('#status')
}

