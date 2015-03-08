# tweetheart
A bunch of twitter messages in the shape of a heart

## Getting started

### Shape inside

CSS `shape-inside` moved from CSS Shapes level 1 into CSS Shapes level 2. The experimental `shape-inside` CSS property was removed from Chrome when this happened so we need to use an old version of Chrome for this mad science experiment to work.

Get a Chrome 34: http://google-chrome.en.uptodown.com/mac/download/61015

Disable Chrome auto update:

```sh
defaults read com.google.Keystone.Agent checkInterval
defaults write com.google.Keystone.Agent checkInterval 0
```

(Default is 18000 - for when you want to put this back)

NOTE: Don't visit the about dialog or chrome will update itself.

Enable `shape-inside` by copy and pasting the following URL into the address bar, then press enter:

```
chrome://flags/#enable-experimental-web-platform-features` 
```

### Configure

Uses [rc](https://www.npmjs.com/package/rc) to configure so create a `.tweetheartrc` file somewhere relevant and add config:

```js
{
  "dbPath": "", // Path to tweet storage
  "twit": { // Twitter API config
    "consumer_key": "",
    "consumer_secret": "",
    "access_token": "",
    "access_token_secret": ""
  },
  "track": "" // Twitter search term
}
```

### Install dependencies

```sh
npm install
```

### Start

```sh
npm start
```
