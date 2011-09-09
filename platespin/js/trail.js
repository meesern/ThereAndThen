(function() {
  var Trail, configureListeners, httpStatusHandler, ioErrorHandler, openHandler, progressHandler, securityErrorHandler;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Trail = typeof exports !== "undefined" && exports !== null ? exports : this;
  Trail.init = function() {
    var canvas, xs, ys;
    canvas = document.createElement('canvas');
    Trail.maxY = 400.0;
    Trail.maxX = 600.0;
    canvas.height = Trail.maxY;
    canvas.width = Trail.maxX;
    $('#tracker').append(canvas);
    Trail.tt = new Array();
    Trail.freshdata();
    Trail.clear();
    Trail.rpstream = "<stream></stream>";
    Trail.timeline = new Trail.TimeLine('#history', Trail.maxX, 30, Trail);
    Trail.timeline.clear();
    Trail.timeline.frame();
    xs = [0, 620];
    ys = [0, 600];
    return Trail.set_scale(xs, ys);
  };
  Trail.trailtrace = function(key) {
    var canvas, _base, _ref;
    if ((_ref = (_base = Trail.tt)[key]) == null) {
      _base[key] = 'make';
    }
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
    Trail.freshdata();
    if (AppCtl.getDsFile() === 1) {
      return Trail.select();
    } else {
      return Trail.download();
    }
  };
  Trail.freshdata = function() {
    Trail.points = [];
    Trail.positions = [];
    Trail.ments = null;
    return Trail.doc = null;
  };
  Trail.animate = function() {
    return Trail.timeline.animate();
  };
  Trail.stop = function() {
    return Trail.stopReplay();
  };
  Trail.stopReplay = function() {
    var replay_url;
    if (this.replayRunning != null) {
      AppReport("Stopping replay " + this.replayRunning);
      replay_url = "replay-control/" + this.replayRunning + "?stop=1";
      Trail.putToCloud(replay_url, Trail.replayctlResponseHandler);
      return Trail.replayStopped();
    } else {
      return AppReport("No replay running");
    }
  };
  Trail.replayStopped = function() {
    AppReport("Replay stopped");
    return this.replayRunning = null;
  };
  Trail.replayctlResponseHandler = function() {
    return AppReport("ok");
  };
  Trail.replay = function() {
    return Trail.startReplay();
  };
  Trail.startReplay = function() {
    AppReport("Starting a Replay");
    if (this.replayRunning != null) {
      return AppReport("Replay " + this.replayRunning + " already running");
    } else {
      this.structureRequest = Trail.replayWithStructure;
      return Trail.getStructure();
    }
  };
  Trail.replayWithStructure = function() {
    var aspect, replay_url;
    aspect = this.aspects[0];
    AppReport("Starting replay for " + aspect);
    replay_url = "replay-create/" + aspect + "?start=1&rate=" + (AppCtl.getRate()) + "&gapskip=" + (AppCtl.getSkip());
    return Trail.putToCloud(replay_url, Trail.replayResponseHandler);
  };
  Trail.replayResponseHandler = __bind(function(event) {
    var data, loader, replayid, valid;
    if (Browser) {
      if (event.target.readyState !== 4) {
        return;
      }
      data = event.target.responseText;
    } else {
      loader = air.URLLoader(event.target);
      data = loader.data;
    }
    AppReport("Replay started at node " + data);
    valid = new RegExp("/replay/\\d+$");
    if (valid.test(data)) {
      replayid = new RegExp("\\d+$");
      this.replayRunning = replayid.exec(data);
      return Trail.replay = new Trail.Replay(AppCtl.getOcServer(), data, Trail);
    } else {
      return AppReport("Failed to start replay. Got: " + data);
    }
  }, this);
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
    this.structureRequest = Trail.getHistory;
    return Trail.getStructure();
  };
  Trail.getStructure = function() {
    AppReport("Fetching Item Structure");
    return Trail.getFromCloud("items", Trail.itemsCompleteHandler);
  };
  Trail.itemsCompleteHandler = __bind(function(event) {
    var aspects_xml, data, doc, loader, name;
    if (Browser) {
      if (event.target.readyState !== 4) {
        return;
      }
      data = event.target.responseText;
    } else {
      loader = air.URLLoader(event.target);
      data = loader.data;
    }
    doc = $.parseXML(data);
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
    return this.structureRequest();
  }, this);
  Trail.getHistory = function() {
    var aspect, _i, _len, _ref, _results;
    this.history_url = "counts/" + this.aspects[0] + "?grain=200";
    this.history_level = "all";
    Trail.getFromCloud(this.history_url, Trail.historyCompleteHandler);
    AppReport("Fetching History & Data");
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
  Trail.dataCompleteHandler = __bind(function(event) {
    var data, loader;
    if (Browser) {
      if (event.target.readyState !== 4) {
        return;
      }
      data = event.target.response;
    } else {
      loader = air.URLLoader(event.target);
      data = loader.data;
    }
    AppReport("Fetch Returned - more");
    Trail.data += data;
    Trail.loads--;
    if (Trail.loads <= 0) {
      Trail.data += "</collection>";
      AppReport("Fetch Complete - plotting");
      return Trail.visualise(Trail.data);
    }
  }, this);
  Trail.historyCompleteHandler = __bind(function(event) {
    var data, history, loader, stop;
    AppReport("History Complete");
    if (Browser) {
      if (event.target.readyState !== 4) {
        return;
      }
      data = event.target.response;
    } else {
      loader = air.URLLoader(event.target);
      data = loader.data;
    }
    history = Trail.history_parse(data);
    if (history.length === 1) {
      AppReport("Should not need to get more");
      return;
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
  }, this);
  Trail.putToCloud = function(api, handler) {
    return this.requestOfCloud(api, handler, "POST");
  };
  Trail.getFromCloud = function(api, handler) {
    return this.requestOfCloud(api, handler, "GET");
  };
  Trail.requestOfCloud = function(api, handler, verb) {
    var loader, req, url;
    url = "http://" + (AppCtl.getOcServer()) + ":" + (AppCtl.getPort()) + "/v1/" + api;
    if (Browser) {
      req = new XMLHttpRequest();
      req.open(verb, url, true);
      req.onreadystatechange = handler;
      req.onprogress = progressHandler;
      return req.send();
    } else {
      req = new air.URLRequest(url);
      loader = new air.URLLoader();
      configureListeners(loader, handler);
      try {
        return loader.load(req);
      } catch (error) {
        return AppReport("Unable to load request");
      }
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
      var day, minute, second, year;
      year = $(this).attr('year');
      day = $(this).attr('day');
      minute = $(this).attr('minute');
      second = $(this).attr('second');
      return points.push([$(this).text(), year, day, minute, second]);
    });
    AppReport("found " + points.length + " counts like " + points[0]);
    return points;
  };
  Trail.parse = function(data, pstart, pend, type) {
    var i, lasttime, point, points, t, te, thelot, time, tmte, tmts, ts, xs, ys, _ref;
    AppReport("parsing data from " + pstart + " to " + pend);
    xs = [];
    ys = [];
    points = [];
    Trail.doc || (Trail.doc = $.parseXML(data));
    this.ments || (this.ments = $(Trail.doc).find('marker'));
    AppReport("found " + this.ments.length + " elements");
    if (this.ments.length === 0) {
      return;
    }
    if (Trail.points.length === 0) {
      lasttime = [];
      this.ments.each(function() {
        var code, marker, time, tstamp, x1, x2, y1, y2;
        marker = $(this);
        time = marker.parent().attr('t');
        code = marker.attr('code');
        tstamp = marker.attr('timestamp');
        x1 = parseFloat(marker.attr('x1'));
        x2 = parseFloat(marker.attr('x2'));
        y1 = parseFloat(marker.attr('y1'));
        y2 = parseFloat(marker.attr('y2'));
        xs.push(x1);
        ys.push(y1);
        xs.push(x2);
        ys.push(y2);
        Trail.points.push([x1, y1, x2, y2, code, time, tstamp]);
        if (lasttime[code] !== tstamp) {
          lasttime[code] = tstamp;
          Trail.positions.push([x1, y1, x2, y2, code, time, tstamp]);
        }
        return true;
      });
      if (!Trail.extend) {
        Trail.set_scale(xs, ys);
      }
    }
    ts = new Date(pstart);
    te = new Date(pend);
    if (type === 'points') {
      thelot = Trail.points;
    } else {
      thelot = Trail.positions;
    }
    for (i = 0, _ref = thelot.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      point = thelot[i];
      time = point[5];
      t = new Date(time);
      tmte = t - te;
      tmts = t - ts;
      if (tmts > 0 && tmte < 0) {
        points.push(point);
      }
    }
    AppReport("found " + points.length + " points");
    if (!(points.length > 0)) {
      return;
    }
    return points;
  };
  Trail.visualise = function(data, pstart, pend) {
    if (pstart == null) {
      pstart = 0;
    }
    if (pend == null) {
      pend = new Date();
    }
    if (AppCtl.getOBox() === 1) {
      Trail.draw_boxes(data, pstart, pend);
    }
    if (AppCtl.getOCorner() === 1) {
      Trail.draw_corners(data, pstart, pend);
    }
    if (AppCtl.getOfCorner() === 1) {
      return Trail.draw_first_corners(data, pstart, pend);
    }
  };
  Trail.draw_boxes = function(data, pstart, pend) {
    var i, points, _ref;
    points = Trail.parse(data, pstart, pend, 'points');
    if (points != null) {
      for (i = 0, _ref = points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        Trail.markout(points[i]);
      }
    }
    return AppReport("parsed");
  };
  Trail.draw_first_corners = function(data, pstart, pend) {
    var i, points, _ref;
    AppReport("Parsing");
    points = null;
    points = Trail.parse(data, pstart, pend, 'positions');
    AppReport("Drawing");
    if (points != null) {
      for (i = 0, _ref = points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        Trail.markout_trail(points[i]);
      }
    }
    return AppReport("Drawn");
  };
  Trail.draw_corners = function(data, pstart, pend) {
    var i, points, _ref;
    points = Trail.parse(data, pstart, pend, 'points');
    for (i = 0, _ref = points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      Trail.markout_trail(points[i]);
    }
    return AppReport("parsed");
  };
  Trail.draw_part = function(pstart, pend) {
    return Trail.visualise(Trail.data, pstart, pend);
  };
  Trail.stream_in = function(message) {
    var data, rpstream;
    AppReport("Stream Data");
    Trail.freshdata();
    rpstream = $(Trail.rpstream).append(message);
    data = (new XMLSerializer()).serializeToString(rpstream[0]);
    Trail.extend = true;
    Trail.visualise(data);
    return Trail.extend = false;
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
    return AppReport("progressHandler loaded:" + event.loaded + " total: " + event.total);
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
