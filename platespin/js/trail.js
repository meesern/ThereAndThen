(function() {
  var Trail, configureListeners, httpStatusHandler, ioErrorHandler, openHandler, progressHandler, securityErrorHandler;
  Trail = typeof exports !== "undefined" && exports !== null ? exports : this;
  Trail.init = function() {
    var canvas;
    canvas = document.createElement('canvas');
    Trail.maxY = 400.0;
    Trail.maxX = 600.0;
    canvas.height = Trail.maxY;
    canvas.width = Trail.maxX;
    $('#tracker').append(canvas);
    Trail.tt = new Array();
    Trail.clear();
    canvas = $('#history canvas')[0];
    canvas.height = 30;
    canvas.width = Trail.maxX;
    Trail.timeline = new Trail.TimeLine(canvas, canvas.width, canvas.height);
    Trail.timeline.clear();
    return Trail.timeline.frame();
  };
  Trail.trailtrace = function(key) {
    var canvas, _base, _ref;
        if ((_ref = (_base = Trail.tt)[key]) != null) {
      _ref;
    } else {
      _base[key] = 'make';
    };
    if (Trail.tt[key] === 'make') {
      AppReport("New Trailtrace for " + key);
      canvas = $('canvas')[0];
      Trail.tt[key] = new Trail.TrailTrace(canvas, canvas.width, canvas.height, 1.08, 80, Trail.huefromcode(key));
    }
    return Trail.tt[key];
  };
  Trail.set_scale = function(xs, ys) {
    var bigx, bigy, canvas_longness, data_longness, smallx, smally, x, xrange, y, yrange, _i, _j, _len, _len2;
    bigx = 1 << 31;
    smallx = 1 << 30;
    bigy = 1 << 31;
    smally = 1 << 30;
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (x > bigx) {
        bigx = x;
      }
      if (x < smallx) {
        smallx = x;
      }
    }
    for (_j = 0, _len2 = ys.length; _j < _len2; _j++) {
      y = ys[_j];
      if (y > bigy) {
        bigy = y;
      }
      if (y < smally) {
        smally = y;
      }
    }
    xrange = bigx - smallx;
    yrange = bigy - smally;
    Trail.xoffset = 0 - smallx;
    Trail.yoffset = 0 - smally;
    data_longness = xrange / yrange;
    canvas_longness = Trail.maxX / Trail.maxY;
    if (data_longness > canvas_longness) {
      Trail.scale = (Trail.maxX - (5 * 2)) / xrange;
    } else {
      Trail.scale = (Trail.maxY - (5 * 2)) / yrange;
    }
    Trail.xcentering = (Trail.maxX - (xrange * Trail.scale)) / 2;
    Trail.ycentering = (Trail.maxY - (yrange * Trail.scale)) / 2;
    return AppReport("Scale: " + Trail.scale + " bigx: " + bigx + " smallx: " + smallx);
  };
  Trail.markout = function(point) {
    var code, x1, x2, y1, y2;
    x1 = point[0];
    y1 = point[1];
    x2 = point[2];
    y2 = point[3];
    code = point[4];
    return Trail.trailtrace(code).squaremark(Trail.xcentering + (x1 + Trail.xoffset) * Trail.scale, Trail.ycentering + (y1 + Trail.yoffset) * Trail.scale, Trail.xcentering + (x2 + Trail.xoffset) * Trail.scale, Trail.ycentering + (y2 + Trail.yoffset) * Trail.scale, Trail.huefromcode(code));
  };
  Trail.markout_trail = function(point) {
    var code, x1, x2, y1, y2;
    x1 = point[0];
    y1 = point[1];
    x2 = point[2];
    y2 = point[3];
    code = point[4];
    return Trail.trailtrace(code).mark(Trail.xcentering + (x1 + Trail.xoffset) * Trail.scale, Trail.ycentering + (y1 + Trail.yoffset) * Trail.scale, Trail.huefromcode(code));
  };
  Trail.draw = function() {
    if (AppCtl.getDsFile() === 1) {
      return Trail.select();
    } else {
      return Trail.download();
    }
  };
  Trail.clear = function() {
    return Trail.trailtrace('0:0:0').clear();
  };
  Trail.select = function() {
    var f;
    if (Browser) {
      return;
    }
    f = new air.File("/home/meesern/Develpment/teaceremony.xml");
    try {
      f.addEventListener(air.Event.SELECT, Trail.openData);
      return f.browseForOpen("Open");
    } catch (error) {
      return air.trace("Open Dialog Failed:", error.message);
    }
  };
  Trail.openData = function(event) {
    AppReport("Open Dialog opening");
    Trail.file = event.target;
    return Trail.drawdata();
  };
  Trail.save = function() {
    var byte, data, f, strData, _i, _len;
    if (Browser) {
      return;
    }
    AppReport("Saving Image");
    strData = $('canvas')[0].toDataURL();
    strData = strData.slice(22);
    data = decodeBase64(strData);
    Trail.data = new air.ByteArray;
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      byte = data[_i];
      Trail.data.writeByte(byte.charCodeAt(0));
    }
    f = new air.File("/home/meesern/Develpment/image.png");
    try {
      f.addEventListener(air.Event.SELECT, Trail.saveData);
      return f.browseForSave("Save As");
    } catch (error) {
      return air.trace("Save Dialog Failed:", error.message);
    }
  };
  Trail.saveData = function(event) {
    var len, newFile, stream;
    air.trace("Save Dialog saving");
    newFile = event.target;
    len = Trail.data.length;
    air.trace(len);
    stream = new air.FileStream();
    stream.open(newFile, air.FileMode.WRITE);
    stream.writeBytes(Trail.data, 0, len);
    return stream.close();
  };
  Trail.download = function() {
    AppReport("Fetching Item Structure");
    return Trail.getFromCloud("items", Trail.itemsCompleteHandler);
  };
  Trail.itemsCompleteHandler = function(event) {
    var aspect, aspects_xml, doc, loader, name, _i, _len, _ref, _results;
    loader = air.URLLoader(event.target);
    doc = $.parseXML(loader.data);
    name = $(doc).find("items > name:contains('" + (AppCtl.getItemName()) + "')")[0];
    AppReport("got " + name);
    if (name == null) {
      return;
    }
    aspects_xml = $(name).parent().find("aspects");
    AppReport("found " + aspects_xml.length + " elements");
    this.aspects = $.map(aspects_xml, function(aspect, i) {
      return $(aspect).find('id').text();
    });
    this.history_url = "counts/" + this.aspects[0];
    this.history_level = "all";
    Trail.getFromCloud(this.history_url, Trail.historyCompleteHandler);
    AppReport("Fetching Data");
    Trail.loads = this.aspects.length;
    Trail.data = "<collection>";
    _ref = this.aspects;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      aspect = _ref[_i];
      _results.push(Trail.getFromCloud("data/" + aspect, Trail.dataCompleteHandler));
    }
    return _results;
  };
  Trail.dataCompleteHandler = function(event) {
    var loader;
    AppReport("Fetch Complete");
    loader = air.URLLoader(event.target);
    Trail.data += loader.data;
    Trail.loads--;
    if (Trail.loads <= 0) {
      Trail.data += "</collection>";
      return Trail.visualise(Trail.data);
    }
  };
  Trail.historyCompleteHandler = function(event) {
    var history, loader, stop;
    AppReport("History Complete");
    loader = air.URLLoader(event.target);
    history = Trail.history_parse(loader.data);
    if (history.length === 1) {
      AppReport("Get more");
      stop = false;
      switch (this.history_level) {
        case "all":
          this.history_url += "/" + history[0][1];
          this.history_level = "year";
          break;
        case "year":
          this.history_url += "/" + history[0][2];
          this.history_level = "day";
          break;
        case "day":
          this.history_url += "/" + history[0][3];
          this.history_level = "minute";
          break;
        case "minute":
          stop = true;
          Trail.timeline.draw(history);
      }
      AppReport(this.history_url);
      if (!stop) {
        return Trail.getFromCloud(this.history_url, Trail.historyCompleteHandler);
      }
    } else {
      return Trail.timeline.draw(history);
    }
  };
  Trail.getFromCloud = function(api, handler) {
    var loader, req;
    if (Browser) {
      return;
    }
    req = new air.URLRequest("http://" + (AppCtl.getOcServer()) + ":" + (AppCtl.getPort()) + "/v1/" + api);
    loader = new air.URLLoader();
    configureListeners(loader, handler);
    try {
      return loader.load(req);
    } catch (error) {
      return AppReport("Unable to load request");
    }
  };
  Trail.drawdata = function() {
    var data;
    data = Trail.fileload();
    return Trail.visualise(data);
  };
  Trail.fileload = function(file) {
    var data, f, fs;
    f = Trail.file;
    fs = new air.FileStream;
    fs.open(f, air.FileMode.READ);
    data = new air.ByteArray;
    fs.readBytes(data, 0, fs.bytesAvailable);
    return data;
  };
  Trail.huefromcode = function(code) {
    var a, codepoints, color_hue, _i, _len;
    codepoints = code.split(':');
    color_hue = 60;
    for (_i = 0, _len = codepoints.length; _i < _len; _i++) {
      a = codepoints[_i];
      color_hue += parseFloat(a) * 42;
    }
    return color_hue %= 255;
  };
  Trail.history_parse = function(data) {
    var counts, history_doc, points;
    AppReport(data);
    history_doc = $.parseXML(data);
    counts = $(history_doc).find('count');
    points = [];
    counts.each(function() {
      var day, minute, year;
      year = $(this).attr('year');
      day = $(this).attr('day');
      minute = $(this).attr('minute');
      return points.push([$(this).text(), year, day, minute]);
    });
    AppReport("found " + points.length + " counts like " + points[0]);
    return points;
  };
  Trail.parse = function(data) {
    var ments, points, xs, ys;
    AppReport("parsing data");
    xs = [];
    ys = [];
    points = [];
    Trail.doc = $.parseXML(data);
    ments = $(Trail.doc).find('marker');
    AppReport("found " + ments.length + " elements");
    ments.each(function() {
      var code, time, x1, x2, y1, y2;
      code = $(this).attr('code');
      time = $(this).attr('timestamp');
      x1 = parseFloat($(this).attr('x1'));
      x2 = parseFloat($(this).attr('x2'));
      y1 = parseFloat($(this).attr('y1'));
      y2 = parseFloat($(this).attr('y2'));
      xs.push(x1);
      ys.push(y1);
      xs.push(x2);
      ys.push(y2);
      return points.push([x1, y1, x2, y2, code, time]);
    });
    AppReport("found " + points.length + " points");
    if (!(points.length > 0)) {
      return;
    }
    Trail.set_scale(xs, ys);
    return points;
  };
  Trail.visualise = function(data) {
    if (AppCtl.getOBox() === 1) {
      Trail.draw_boxes(data);
    }
    if (AppCtl.getOCorner() === 1) {
      Trail.draw_corners(data);
    }
    if (AppCtl.getOfCorner() === 1) {
      return Trail.draw_first_corners(data);
    }
  };
  Trail.draw_boxes = function(data) {
    var i, points, _ref;
    points = Trail.parse(data);
    for (i = 0, _ref = points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      Trail.markout(points[i]);
    }
    return AppReport("parsed");
  };
  Trail.draw_first_corners = function(data) {
    var code, i, lasttime, points, time, _ref, _ref2, _ref3;
    points = Trail.parse(data);
    lasttime = new Array;
    for (i = 0, _ref = points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      code = (_ref2 = points[i]) != null ? _ref2[4] : void 0;
      time = (_ref3 = points[i]) != null ? _ref3[5] : void 0;
      if (lasttime[code] !== time) {
        Trail.markout_trail(points[i]);
      }
      lasttime[code] = time;
    }
    return AppReport("fc parsed");
  };
  Trail.draw_corners = function(data) {
    var i, points, _ref;
    points = Trail.parse(data);
    for (i = 0, _ref = points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      Trail.markout_trail(points[i]);
    }
    return AppReport("parsed");
  };
  configureListeners = function(dispatcher, complete) {
    dispatcher.addEventListener(air.Event.COMPLETE, complete);
    dispatcher.addEventListener(air.Event.OPEN, openHandler);
    dispatcher.addEventListener(air.ProgressEvent.PROGRESS, progressHandler);
    dispatcher.addEventListener(air.SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
    dispatcher.addEventListener(air.HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
    return dispatcher.addEventListener(air.IOErrorEvent.IO_ERROR, ioErrorHandler);
  };
  openHandler = function(event) {
    return AppReport("openHandler: " + event);
  };
  progressHandler = function(event) {
    return AppReport("progressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal);
  };
  securityErrorHandler = function(event) {
    return AppReport("securityErrorHandler: " + event);
  };
  httpStatusHandler = function(event) {
    return AppReport("httpStatusHandler: " + event);
  };
  ioErrorHandler = function(event) {
    return AppReport("ioErrorHandler: " + event);
  };
}).call(this);
