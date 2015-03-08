var socket = require('engine.io-client')('ws://' + location.host)
var escape = require('escape-html')
var async = require('async')

var queue = async.queue(addTweet, 1)

socket.on('open', function () {
  socket.on('message', function (data) {
    var tweet = JSON.parse(data)
    console.log(tweet)
    queue.push(tweet)
  })
  socket.on('close', function () {
    console.log('Connection closed')
  })
})

var heart = document.getElementById('heart')

heart.style.height = (window.innerHeight - 20) + 'px'

var fontSize = parseFloat(getComputedStyle(heart, null).getPropertyValue('font-size'))

function isOverflowed (el) {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
}

function reflow () {
  while (isOverflowed(heart)) {
    fontSize -= 0.2
    heart.style.fontSize = fontSize + 'px'
  }
}

function spin () {
  heart.className = heart.className ? '' : 'spin'
}

function addTweet (t, cb) {
  var tweetHtml = ' <span class="new">' + escape(t.user.name) + ': ' + escape(t.text) + '</span>'

  spin()

  // Add the text exactly half way through the spin
  setTimeout(function () {

    // Buggy shape-inside implementation doesn't work if we append a node (2013-12-31)
    heart.innerHTML = heart.innerHTML + tweetHtml

    reflow()

    // Allow CSS to transition the tweet in the next tick
    setTimeout(function () {
      var tweets = document.querySelectorAll('.new')
      for (var i = 0; i < tweets.length; ++i) {
        tweets[i].className = ''
      }
    }, 0)

  }, 400)

  setTimeout(cb, 1000)
}