#

root= exports ? this

class root.Replay 
  constructor: (@server,@subnode,@observer) ->
    @pubsub_server = 'pubsub.' + @server
    AppReport("Subscribing to #{@pubsub_server}, #{@subnode}")
    boshService = "http://#{@server}:5280/http-bind"
    @connection = new Strophe.Connection(boshService)
    @connection.rawInput = @raw_input
    @connection.rawOutput = @raw_output
    @clientJid = "test@greenbean"
    @connection.connect(@clientJid, 'jabber', Replay_on_connect)

  connection: null
  subscribed: false
  show_raw: false


  # show the raw XMPP information coming in
  raw_input: (data) =>
    if (@show_raw)
      AppReport("RECV: #{data}")

  # show the raw XMPP information going out
  raw_output: (data) =>
    if (@show_raw)
      AppReport("SENT: #{data}")

  # decide what to do with an incoming message
  # data is query result
  handle_update: (data) ->
    stopped = $(data).find('replay_control').attr('stopped')
    if stopped?
      @observer.replayStopped()
    m = $(data).find('ment')
    if m?
      @observer.stream_in(m)

  on_event: (message) ->
    if (!@subscribed)
      AppReport("Message when not Subscribed")
      return true
    #AppReport("Message #{message}")
    server = "^" + @pubsub_server.replace(/\./g, "\\.")
    re = new RegExp(server)
    if ($(message).attr('from').match(re) and $(message).attr('type') == 'headline')
      _data = $(message).children('event')
        .children('items')
        .children('item')
      if (_data) 
        @handle_update(_data[0])
    return true

  on_subscribe: (sub) ->
    @subscribed = true
    AppReport("Now awaiting messages...")
    return true

  on_connect: (status) ->
    AppReport('on_connect')
    if (status == Strophe.Status.CONNECTING) 
      AppReport('Connecting...')
    else if (status == Strophe.Status.CONNFAIL) 
      AppReport('Failed to connect!')
    else if (status == Strophe.Status.DISCONNECTING)
      AppReport('Disconnecting...')
    else if (status == Strophe.Status.DISCONNECTED)
      AppReport('Disconnected')
    else if (status == Strophe.Status.CONNECTED)
      AppReport("Connected")
      @connection.send($pres().c('priority').t('-1'))
      @connection.pubsub.subscribe( @connection.jid, @pubsub_server, @subnode, [], Replay_on_event, Replay_on_subscribe)
    true


