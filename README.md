[![Build Status](https://travis-ci.org/ubolonton/js-csp.svg?branch=master)](https://travis-ci.org/ubolonton/js-csp)

# core-async

This project is a fork of [js-csp](https://github.com/ubolonton/js-csp) that was created for the sake of exploring a different API. The goal of this exploration is to try to come up with an API that has minimal surface area and is idiomatic to javascript. Ideally, this testing will have some positive impact on the js-csp project.

The current implementation simply wraps the js-csp exports in an API that has a more object-oriented approach. This approach allows this library to keep the actual implementation code in sync with the js-csp project as much as possible. The only initial modifications that were made to the js-csp core were to enable implicit takes on the channels in this library, and to pull in an unmerged (at the time of this library's creation) pull request from js-csp that enabled ```poll``` and ```offer``` operations.

The core-async name was chosen for the time being because this library aims to relatively closely match the functionality of Clojure's [core-async](https://github.com/clojure/core.async) library using the simplest API possible.


## Syntax Comparison ##

### Create a channel from DOM events
#### js-csp
```javascript
var csp = require('csp');
// Create channel, add event listener to DOM element
var ch = csp.chan();
var body = document.querySelector('body');
var eventFunction = function(e){csp.putAsync(ch, e)};
body.addEventListener('click', eventFunction);
// Close channel, remove event listener
body.removeEventListener('click', eventFunction);
ch.close();
```
#### core-async
```javascript
var {Chan} = require('core-async');
// Create channel, add event listener to DOM element
var ch = new Chan().addEvent(['body', 'click']);
// Close channel, event listeners automatically cleaned up
ch.close();
```

### Mix Channels

#### js-csp
```javascript
var csp = require('csp');
// Create a mix
var ch1 = csp.chan();
var ch2 = csp.chan();
var outChan = csp.chan();
var mix = csp.operations.mix(outChan);
// Add the input channels to the mix and take a value
csp.operations.mix.add(mix, ch1);
csp.operations.mix.add(mix, ch2);
csp.putAsync(ch1, 1);
csp.takeAsync(outChan);
// Mute the channels
csp.operations.mix.toggle(mix, [[ch1, { mute: true }], [ch2, { mute: true }]]);
// Unmute the channels
csp.operations.mix.toggle(mix, [[ch1, { mute: false }], [ch2, { mute: false }]]);
```
#### core-async
```javascript
var {Chan, Mix} = require('core-async');
// Create a mix
var ch1 = new Chan();
var ch2 = new Chan();
var mix = new Mix();
// Add the input channels to the mix and take a value
mix.add(ch1, ch2);
ch1.putAsync(ch1, 1);
mix.takeAsync();
// Mute the channels
mix.mute(ch1, ch2);
// Unmute the channels
mix.unmute(ch1, ch2);

```

<!-- #### js-csp
```javascript

```

#### core-async
```javascript

``` -->


## Supported runtimes ##
core-async and js-csp requires ES6 generators.

#### Firefox >= 27 ####

Earlier versions of Firefox either had ES6 generators turned off, or supported only old style generators.

#### Node.JS >= 0.11.6 ####

Run with `--harmony` or `--harmony-generators` flag. Check support using
```bash
node --v8-options | grep harmony
```

#### Chrome >= 28 ####
Turn on an experimental flag. Look for "Enable Experimental JavaScript" at [chrome://flags](chrome://flags).

#### Other ####

Use one of the js-to-js compilers:
- [Babel](http://babeljs.io/docs/learn-es6/#generators)
- [Facebook Regenerator](http://facebook.github.io/regenerator/).
- [Google Closure Compiler](https://developers.google.com/closure/compiler/) with `--language_in ECMASCRIPT6 --language_out ECMASCRIPT3` flags.
- [Google Traceur](https://github.com/google/traceur-compiler).

Or, if you use Python's Twisted:
https://github.com/ubolonton/twisted-csp

Or, if you want a better language:
https://github.com/clojure/core.async


## Contribution ##

Feel free to open issues for questions/discussions. Feedback is welcome.

## License ##

Distributed under [MIT License](http://opensource.org/licenses/MIT).
