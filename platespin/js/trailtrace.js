(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.TrailTrace = (function() {
    function TrailTrace(canvas, maxX, maxY, speed, maxRadius, hue) {
      this.maxX = maxX;
      this.maxY = maxY;
      this.speed = speed != null ? speed : 1.01;
      this.maxRadius = maxRadius != null ? maxRadius : 80;
      this.hue = hue != null ? hue : 0;
      this.color = "rgba(255,255,255,0.33)";
      this.ctx = canvas.getContext("2d");
      this.minRadius = 1.5;
      this.x = this.y = 0;
      this.distance = 0;
      this.radius = this.minRadius;
    }
    TrailTrace.prototype.clear = function() {
      this.ctx.fillStyle = 'rgba(0,0,0,0.0)';
      this.ctx.clearRect(0, 0, this.maxX, this.maxY);
      return this.ctx.fillRect(0, 0, this.maxX, this.maxY);
    };
    TrailTrace.prototype.squaremark = function(x1, y1, x2, y2, xhue) {
      var stroke;
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      stroke = "hsla(" + this.hue + ",95%,80%,0.25)";
      this.ctx.strokeStyle = stroke;
      this.ctx.fillStyle = "rgba(0,0,0,0)";
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x1, y2);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x2, y1);
      this.ctx.lineTo(x1, y1);
      this.ctx.stroke();
      this.ctx.fill();
      return this.ctx.closePath();
    };
    TrailTrace.prototype.mark = function(x, y, xhue) {
      var dx, dy;
      this.color = "hsla(" + this.hue + ",100%,70%,0.6)";
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
      this.radius = this.radius * this.speed;
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
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = this.color;
      this.ctx.fillStyle = "rgba(80,80,80,0.02)";
      this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.fill();
      return this.ctx.closePath();
    };
    return TrailTrace;
  })();
}).call(this);
