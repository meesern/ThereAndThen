(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.TimeLine = (function() {
    function TimeLine(replay_url, observer) {
      this.replay_url = replay_url;
      this.observer = observer;
      this.axis_color = "";
    }
    TimeLine.prototype.clear = function() {
      return this.chart.selectAll('*').remove();
    };
    return TimeLine;
  })();
}).call(this);
