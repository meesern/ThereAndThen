(function() {
  var Trail, TrailTrace;
  Trail = typeof this !== "undefined" && this !== null ? this : exports;
  $(document).ready(function() {
    return Trail.init();
  });
  TrailTrace = (function() {
    var circle;
    function TrailTrace(canvas, color, maxX, maxY, maxRadius) {
      this.color = color;
      this.maxX = maxX;
      this.maxY = maxY;
      this.maxRadius = maxRadius != null ? maxRadius : 80;
      this.grx = canvas.getContext("2d");
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
      var stretch;
      if (this.distance < 2) {
        return;
      }
      stretch = this.distance / 10;
      this.radius = this.radius / (1 + stretch);
      if (this.radius < this.minRadius) {
        return this.radius = this.minRadius;
      }
    };
    circle = function(x, y, r) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "rgba(0,0,0,0.05)";
      this.ctx.fillStyle = "rgba(255,255,255,0.02)";
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
    canvas.height = 400;
    canvas.width = 900;
    $('#tracker').append(canvas);
    return Trail.trailtrace = new TrailTrace($('canvas'), 'rgb(255,255,255)', canvas.width, canvas.height);
  };
}).call(this);
