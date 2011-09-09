(function() {
  var root;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Replay = (function() {
    function Replay(server, subnode, observer) {
      var boshService;
      this.server = server;
      this.subnode = subnode;
      this.observer = observer;
      this.raw_output = __bind(this.raw_output, this);
      this.raw_input = __bind(this.raw_input, this);
      this.pubsub_server = 'pubsub.' + this.server;
      AppReport("Subscribing to " + this.pubsub_server + ", " + this.subnode);
      boshService = "http://" + this.server + ":5280/http-bind";
      this.connection = new Strophe.Connection(boshService);
      this.connection.rawInput = this.raw_input;
      this.connection.rawOutput = this.raw_output;
      this.clientJid = "test@greenbean";
      this.connection.connect(this.clientJid, 'jabber', Replay_on_connect);
    }
    Replay.prototype.connection = null;
    Replay.prototype.subscribed = false;
    Replay.prototype.show_raw = false;
    Replay.prototype.raw_input = function(data) {
      if (this.show_raw) {
        return AppReport("RECV: " + data);
      }
    };
    Replay.prototype.raw_output = function(data) {
      if (this.show_raw) {
        return AppReport("SENT: " + data);
      }
    };
    Replay.prototype.handle_update = function(data) {
      var m, stopped;
      stopped = $(data).find('replay_control').attr('stopped');
      if (stopped != null) {
        this.observer.replayStopped();
      }
      m = $(data).find('ment');
      if (m != null) {
        return this.observer.stream_in(m);
      }
    };
    Replay.prototype.on_event = function(message) {
      var re, server, _data;
      if (!this.subscribed) {
        AppReport("Message when not Subscribed");
        return true;
      }
      server = "^" + this.pubsub_server.replace(/\./g, "\\.");
      re = new RegExp(server);
      if ($(message).attr('from').match(re) && $(message).attr('type') === 'headline') {
        _data = $(message).children('event').children('items').children('item');
        if (_data) {
          this.handle_update(_data[0]);
        }
      }
      return true;
    };
    Replay.prototype.on_subscribe = function(sub) {
      this.subscribed = true;
      AppReport("Now awaiting messages...");
      return true;
    };
    Replay.prototype.on_connect = function(status) {
      AppReport('on_connect');
      if (status === Strophe.Status.CONNECTING) {
        AppReport('Connecting...');
      } else if (status === Strophe.Status.CONNFAIL) {
        AppReport('Failed to connect!');
      } else if (status === Strophe.Status.DISCONNECTING) {
        AppReport('Disconnecting...');
      } else if (status === Strophe.Status.DISCONNECTED) {
        AppReport('Disconnected');
      } else if (status === Strophe.Status.CONNECTED) {
        AppReport("Connected");
        this.connection.send($pres().c('priority').t('-1'));
        this.connection.pubsub.subscribe(this.connection.jid, this.pubsub_server, this.subnode, [], Replay_on_event, Replay_on_subscribe);
      }
      return true;
    };
    return Replay;
  })();
}).call(this);
