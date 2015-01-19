var http = require('http')
var path =require('path')
var ecstatic = require('ecstatic')
var engine = require('engine.io')
var config = require('rc')('tweetheart')
var Twit = require('twit')
var levelup = require('levelup')

var dbPath = config.dbPath || path.join(__dirname, 'data', 'tweets')
var db = levelup(dbPath)

var port = process.env.PORT || config.port || 7053
var server = http.createServer(
  ecstatic({root: __dirname + '/public'})
).listen(port, function () {
  console.log('Listening on :' + port)
})

var socketServer = engine.attach(server)

socketServer.on('connection', function (socket) {
  var readable = db.createReadStream()
    .on('data', function (data) {
      socket.send(data.value)
    })
    .once('end', function () {
      readable = null
    })

  socket.once('close', function () {
    if (readable) readable.destroy()
  })
})

function broadcast (data) {
  Object.keys(socketServer.clients).forEach(function (id) {
    socketServer.clients[id].send(data)
  })
}

new Twit(config.twit)
  .stream('statuses/filter', {track: config.track})
  .on('tweet', function (tweet) {
    tweet = JSON.stringify(tweet)
    broadcast(tweet)
    db.put('tweet-' + Date.now(), tweet)
  })