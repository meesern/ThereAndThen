(function() {
  var Trail, TrailTrace, completeHandler, configureListeners, httpStatusHandler, ioErrorHandler, openHandler, progressHandler, securityErrorHandler;
  Trail = exports;
  TrailTrace = (function() {
    function TrailTrace(canvas, color, maxX, maxY, maxRadius) {
      this.color = color;
      this.maxX = maxX;
      this.maxY = maxY;
      this.maxRadius = maxRadius != null ? maxRadius : 80;
      this.ctx = canvas.getContext("2d");
      this.minRadius = 1.5;
      this.x = this.y = 0;
      this.distance = 0;
      this.radius = this.minRadius;
    }
    TrailTrace.prototype.mark = function(x, y) {
      var dx, dy;
      dx = x - this.x;
      dy = y - this.y;
      this.x = x;
      this.y = y;
      this.distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      return this.draw();
    };
    TrailTrace.prototype.draw = function() {
      this.flow();
      this.stretch();
      if (this.radius !== this.maxRadius) {
        return this.circle(this.x, this.y, this.radius);
      }
    };
    TrailTrace.prototype.flow = function() {
      this.radius = this.radius * 1.01;
      if (this.radius > this.maxRadius) {
        return this.radius = this.maxRadius;
      }
    };
    TrailTrace.prototype.stretch = function() {
      var strtch;
      if (this.distance < 2) {
        return;
      }
      strtch = this.distance / 10;
      this.radius = this.radius / (1 + strtch);
      if (this.radius < this.minRadius) {
        return this.radius = this.minRadius;
      }
    };
    TrailTrace.prototype.circle = function(x, y, r) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "rgba(255,255,255,0.33)";
      this.ctx.fillStyle = "rgba(80,80,80,0.02)";
      this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.fill();
      return this.ctx.closePath();
    };
    return TrailTrace;
  })();
  Trail.init = function() {
    var canvas;
    canvas = document.createElement('canvas');
    Trail.maxY = 400.0;
    Trail.maxX = 600.0;
    canvas.height = Trail.maxY;
    canvas.width = Trail.maxX;
    $('#tracker').append(canvas);
    return Trail.trailtrace = new TrailTrace($('canvas')[0], 'rgb(255,255,255)', canvas.width, canvas.height);
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
      Trail.scale = (Trail.maxX - (80 * 2)) / xrange;
    } else {
      Trail.scale = (Trail.maxY - (80 * 2)) / yrange;
    }
    Trail.xcentering = (Trail.maxX - (xrange * Trail.scale)) / 2;
    Trail.ycentering = (Trail.maxY - (yrange * Trail.scale)) / 2;
    return AppReport("Scale: " + Trail.scale + " bigx: " + bigx + " smallx: " + smallx);
  };
  Trail.markout = function(x, y) {
    return Trail.trailtrace.mark(Trail.xcentering + (x + Trail.xoffset) * Trail.scale, Trail.ycentering + (y + Trail.yoffset) * Trail.scale);
  };
  Trail.download = function() {
    var loader, req;
    AppReport("Fetching Data");
    req = new air.URLRequest("http://greenbean:3000/data/1");
    loader = new air.URLLoader();
    configureListeners(loader);
    try {
      return loader.load(req);
    } catch (error) {
      return air.trace("Unable to load request");
    }
  };
  Trail.parse = function(data) {
    var i, ments, xs, ys, _ref;
    AppReport("parsing data");
    xs = [];
    ys = [];
    Trail.doc = $.parseXML(data);
    AppReport("got: " + Trail.doc);
    ments = $(Trail.doc).find('ment');
    AppReport("found " + ments.length + " elements");
    ments.each(function() {
      var x, y;
      x = parseFloat($(this).find('lon:first').text());
      y = parseFloat($(this).find('lat:first').text());
      xs.push(x);
      return ys.push(y);
    });
    AppReport("found " + xs.length + " points");
    if (!(xs.length > 0)) {
      return;
    }
    Trail.set_scale(xs, ys);
    for (i = 0, _ref = xs.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      Trail.markout(xs[i], ys[i]);
    }
    return AppReport("parsed");
  };
  configureListeners = function(dispatcher) {
    dispatcher.addEventListener(air.Event.COMPLETE, completeHandler);
    dispatcher.addEventListener(air.Event.OPEN, openHandler);
    dispatcher.addEventListener(air.ProgressEvent.PROGRESS, progressHandler);
    dispatcher.addEventListener(air.SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
    dispatcher.addEventListener(air.HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
    return dispatcher.addEventListener(air.IOErrorEvent.IO_ERROR, ioErrorHandler);
  };
  completeHandler = function(event) {
    var loader;
    AppReport("Fetch Complete");
    loader = air.URLLoader(event.target);
    return Trail.parse(loader.data);
  };
  openHandler = function(event) {
    return air.trace("openHandler: " + event);
  };
  progressHandler = function(event) {
    return air.trace("progressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal);
  };
  securityErrorHandler = function(event) {
    return air.trace("securityErrorHandler: " + event);
  };
  httpStatusHandler = function(event) {
    return air.trace("httpStatusHandler: " + event);
  };
  ioErrorHandler = function(event) {
    return air.trace("ioErrorHandler: " + event);
  };
}).call(this);
