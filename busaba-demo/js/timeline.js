(function() {
  var root;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.TimeLineCanvas = (function() {
    function TimeLineCanvas(canvas, maxX, maxY) {
      this.canvas = canvas;
      this.maxX = maxX;
      this.maxY = maxY;
      this.pen = new Pen(this.canvas);
      this.color = "rgba(255,255,255,0.33)";
      this.ctx = this.canvas.getContext("2d");
      this.axis_color = "hsla(0,1%,50%,1)";
      this.axis_height = 8;
      this.axis_indent = 8;
      this.tick_len = 4;
      this.y_axis_len = 20;
      this.axis_thickness = 3;
      this.tick_thickness = 1;
      this.x_axis_len = this.maxX - 2 * this.axis_indent;
      this.x_axis_level = this.maxY - this.axis_height;
    }
    TimeLineCanvas.prototype.clear = function() {
      this.ctx.fillColor = 'rgba(0,0,0,1)';
      this.ctx.clearRect(0, 0, this.maxX, this.maxY);
      return this.ctx.fillRect(0, 0, this.maxX, this.maxY);
    };
    TimeLineCanvas.prototype.frame = function() {
      var i, _results;
      this.ctx.save();
      this.ctx.lineWidth = this.axis_thickness;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.axis_color;
      this.ctx.beginPath();
      this.ctx.moveTo(this.axis_indent, this.x_axis_level);
      this.ctx.lineTo(this.axis_indent + this.x_axis_len, this.x_axis_level);
      this.ctx.moveTo(this.axis_indent, this.x_axis_level);
      this.ctx.lineTo(this.axis_indent, this.x_axis_level - this.y_axis_len);
      this.ctx.moveTo(this.axis_indent + this.x_axis_len, this.x_axis_level);
      this.ctx.lineTo(this.axis_indent + this.x_axis_len, this.x_axis_level - this.y_axis_len);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
      this.pen.penstyle(this.axis_color);
      this.pen.jump(this.axis_indent, this.x_axis_level);
      _results = [];
      for (i = 1; i <= 12; i++) {
        _results.push(this.pen.pendown().down(4).draw().penup().up(4).right(this.x_axis_len / 11));
      }
      return _results;
    };
    TimeLineCanvas.prototype.draw = function(data) {
      var d, fitdata, penwidth, points, _i, _len, _results;
      fitdata = this.rescale(data, this.y_axis_len);
      this.pen.penstyle("hsla(0,70%,60%,1)");
      this.pen.jump(this.axis_indent, this.x_axis_level);
      points = data.length;
      penwidth = (this.x_axis_len - this.axis_thickness) / points;
      this.pen.pensize(penwidth);
      this.pen.penup().right((penwidth / 2) + 1);
      _results = [];
      for (_i = 0, _len = fitdata.length; _i < _len; _i++) {
        d = fitdata[_i];
        _results.push(this.pen.pendown().up(d).draw().penup().down(d).right(penwidth));
      }
      return _results;
    };
    TimeLineCanvas.prototype.rescale = function(data, scalemax) {
      var datamax;
      data = data.map(function(p) {
        return p[0];
      });
      datamax = Math.max.apply(Math, data);
      AppReport("datamax " + datamax);
      return data.map(function(p) {
        return p * scalemax / datamax;
      });
    };
    return TimeLineCanvas;
  })();
  root.TimeLine = (function() {
    function TimeLine(selector, maxX, maxY, observer) {
      this.selector = selector;
      this.maxX = maxX;
      this.maxY = maxY;
      this.observer = observer;
      this.ani_frame = __bind(this.ani_frame, this);
      this.axis_color = "hsla(0,1%,50%,1)";
      this.graphHeight = 40;
      this.divHeight = this.graphHeight + 4;
      this.graphWidth = this.maxX;
      this.barWidth = 4;
      this.maxSamples = Math.floor(this.graphWidth / this.barWidth);
      this.chart = d3.select(this.selector).append("svg:svg").attr("class", "chart").attr("height", this.divHeight);
      this.animationStep = 2;
      this.closeness = 2;
      this.aniWidth = 10;
      this.animationInterval = 150;
      this.animationStop = this.maxX;
    }
    TimeLine.prototype.clear = function() {
      return this.chart.selectAll('*').remove();
    };
    TimeLine.prototype.animate = function() {
      AppReport("Theta Replay");
      if (this.animationId != null) {
        clearInterval(this.animationId);
      }
      this.ani_region_start();
      return this.animationId = setInterval(this.ani_frame, this.animationInterval);
    };
    TimeLine.prototype.frame = function() {};
    TimeLine.prototype.draw = function(data) {
      var dmax, dmin, myregionend, myregionstart, x, y;
      this.clear();
      data = this.mush(data, this.maxSamples);
      dmin = d3.min(data, function(d) {
        return parseFloat(d[0]);
      });
      dmax = d3.max(data, function(d) {
        return parseFloat(d[0]);
      });
      x = d3.scale.linear().domain([0, 1]).range([0, this.barWidth]);
      y = d3.scale.linear().domain([dmin, dmax]).rangeRound([0, this.graphHeight]);
      this.tscale = d3.scale.linear().domain([0, this.graphWidth]).range([data[0][1].getTime(), data[data.length - 1][2].getTime()]);
      this.chart.attr("width", this.barWidth * data.length - 1);
      this.chart.selectAll("rect").data(data).enter().append("svg:rect").attr("x", __bind(function(d, i) {
        return x(i) - 0.5;
      }, this)).attr("y", __bind(function(d, i) {
        return this.divHeight - y(d[0]) - 0.5;
      }, this)).attr("width", this.barWidth).attr("height", function(d) {
        return y(d[0]);
      });
      this.chart.append("svg:line").attr("x1", 0).attr("x2", this.barWidth * data.length).attr("y1", this.divHeight - 0.5).attr("y2", this.divHeight - 0.5).attr("stroke", "#CCC");
      myregionstart = createBoundedWrapper(this, this.mouse_region_start);
      myregionend = createBoundedWrapper(this, this.mouse_region_end);
      return this.chart.on('mousedown', function() {
        return myregionstart(this);
      }).on('mouseup', function() {
        return myregionend(this);
      });
    };
    TimeLine.prototype.mush = function(data, size) {
      var d, datastep, di, e, early, efrac, end, late, m, mcount, middle, s, sfrac, start, _i;
      sfrac = start = middle = end = di = 0;
      d = [];
      datastep = data.length / size;
      for (_i = 1; 1 <= size ? _i <= size : _i >= size; 1 <= size ? _i++ : _i--) {
        early = this.datefromdata(data[di]);
        mcount = Math.floor(datastep - sfrac);
        efrac = datastep - mcount - sfrac;
        s = parseFloat(data[di][0]) * sfrac;
        if (sfrac !== 0) {
          di++;
        }
        m = 0;
        while (mcount--) {
          m += parseFloat(data[di++][0]);
        }
        if (efrac !== 0) {
          e = parseFloat(data[di][0]) * efrac;
        } else {
          e = 0;
        }
        late = this.datefromdata(data[di]);
        d.push([s + m + e, early, late]);
        sfrac = Math.min(1 - efrac, datastep);
      }
      return d;
    };
    TimeLine.prototype.datefromdata = function(point) {
      return new Date(point[1], null, point[2], null, point[3], point[4]);
    };
    TimeLine.prototype.ani_region_start = function() {
      this.animationPos = 0;
      return this.ani_frame();
    };
    TimeLine.prototype.ani_frame = function() {
      this.region_start([this.animationPos, 0]);
      this.animationPos = this.animationPos + this.animationStep;
      this.region_extend([this.animationPos, 0]);
      this.region_end();
      if (this.animationPos > this.animationStop) {
        return clearInterval(this.animationId);
      }
    };
    TimeLine.prototype.mouse_region_start = function(event, d, i) {
      var myregionend, myregionextend, xy;
      xy = d3.svg.mouse(event);
      this.region_start(xy, d, i);
      myregionextend = createBoundedWrapper(this, this.mouse_region_extend);
      this.chart.on('mousemove', function() {
        return myregionextend(this);
      });
      myregionend = createBoundedWrapper(this, this.mouse_region_end);
      return $("" + this.selector + " > svg").mouseleave(function() {
        return myregionend(this);
      });
    };
    TimeLine.prototype.region_start = function(xy) {
      var _ref;
      this.roldx1 = this.rx1;
      this.roldx2 = this.rx2;
      if (Math.abs(xy[0] - this.rx1) < this.closeness && this.sel) {
        this.handle = 'start';
        this.rx1 = xy[0];
      } else if (Math.abs(xy[0] - this.rx2) < this.closeness && this.sel) {
        this.handle = 'end';
        this.rx2 = xy[0];
        if (this.rx2 - this.rx1 > this.aniWidth) {
          this.rx1 = this.rx2 - this.aniWidth;
        }
      } else {
        this.rx1 = this.rx2 = xy[0];
        this.handle = 'new';
      }
      if ((_ref = this.sel) == null) {
        this.sel = this.chart.append("svg:rect");
      }
      return this.sel.attr('id', 'selection').attr("x", this.rx1).attr("y", 0).attr("width", this.rx2 - this.rx1).attr("height", this.divHeight);
    };
    TimeLine.prototype.mouse_region_extend = function(event) {
      var xy;
      xy = d3.svg.mouse(event);
      return this.region_extend(xy);
    };
    TimeLine.prototype.region_extend = function(xy) {
      var _ref;
      if (this.handle === 'start') {
        this.rx1 = xy[0];
      } else {
        this.rx2 = xy[0];
      }
      if (this.rx2 < this.rx1) {
        _ref = [this.rx1, this.rx2], this.rx2 = _ref[0], this.rx1 = _ref[1];
      }
      return d3.select("#selection").attr("x", this.rx1).attr("width", this.rx2 - this.rx1);
    };
    TimeLine.prototype.mouse_region_end = function(event) {
      this.chart.on('mousemove', null);
      $("" + this.selector + " > svg").unbind('mouseleave');
      return this.region_end();
    };
    TimeLine.prototype.region_end = function() {
      var from, to;
      if (this.rx2 - this.rx1 > 1) {
        this.observer.clear();
        from = this.timeatpos(this.rx1);
        to = this.timeatpos(this.rx2);
        return this.observer.draw_part(from, to);
      }
    };
    TimeLine.prototype.timeatpos = function(x) {
      var d;
      d = new Date(this.tscale(x));
      d.setTime(this.tscale(x) - (d.getTimezoneOffset() * 60000));
      return d;
    };
    return TimeLine;
  })();
}).call(this);
