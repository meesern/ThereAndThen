(function() {
  var Index;
  Index = air_index;
  $(document).ready(function() {
    return Index.init();
  });
  Index.init = function() {
    var canvas;
    canvas = document.createElement('canvas');
    canvas.height = 400;
    canvas.width = 900;
    $('#tracker').append(canvas);
    Index.canvas = $('canvas');
    Index.ctx = canvas.getContext("2d");
    Index.nowX = 0;
    Index.nowY = 0;
    Index.minRadius = 1.5;
    Index.maxRadius = 80;
    Index.distance = 0.0;
    Index.radius = Index.minRadius;
    Index.canvas.mousemove(function(e) {
      return Index.mousemove(e);
    });
    Index.canvas.mouseenter(function(e) {
      return Index.mouseenter(e);
    });
    return Index.canvas.mouseleave(function(e) {
      return Index.mouseleave(e);
    });
  };
  Index.mouseenter = function(e) {
    return Index.tick = setInterval(function(){visit();}, 25);
  };
  Index.mouseleave = function(e) {
    return clearInterval(Index.tick);
  };
  Index.mousemove = function(e) {
    var dx, dy, pos, x, y;
    pos = Index.canvas.position();
    x = e.pageX - pos.left;
    y = e.pageY - pos.top;
    dx = x - Index.nowX;
    dy = y - Index.nowY;
    Index.nowX = x;
    Index.nowY = y;
    return Index.distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  };
  Index.mark = function() {
    Index.flow();
    Index.stretch();
    if (Index.radius !== Index.maxRadius) {
      return Index.circle(Index.nowX, Index.nowY, Index.radius);
    }
  };
  Index.flow = function() {
    Index.radius = Index.radius * 1.01;
    if (Index.radius > Index.maxRadius) {
      return Index.radius = Index.maxRadius;
    }
  };
  Index.stretch = function() {
    var stretch;
    if (Index.distance < 2) {
      return;
    }
    stretch = Index.distance / 10;
    Index.radius = Index.radius / (1 + stretch);
    if (Index.radius < Index.minRadius) {
      return Index.radius = Index.minRadius;
    }
  };
  Index.circle = function(x, y, r) {
    Index.ctx.beginPath();
    Index.ctx.strokeStyle = "rgba(0,0,0,0.05)";
    Index.ctx.fillStyle = "rgba(255,255,255,0.02)";
    Index.ctx.arc(x, y, r, 0, Math.PI * 2, false);
    Index.ctx.stroke();
    Index.ctx.fill();
    return Index.ctx.closePath();
  };
}).call(this);
