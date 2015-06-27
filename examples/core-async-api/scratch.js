/* @flow */

// Accepts: Chan and bool | array of chan and bools
// tap(chan)
// tap(chan, true)
// tap(chan, xf)
// tap(chan, xf, true)

// Possible uses:
// add(chan)
// add([target, event]);
// add([chan1, chan2,[targ1, evt1], chan3, [targ2, evt2]]);
// add(chan1, chan2, [targ1, evt1], chan3, [targ2, evt2]);

// alts(chan1, chan2, [chan3, v3], chan4, [chan5, v5]);
// alts(chan1);
// alts([chan1, v1]);
// alts([chan1, chan2, [chan3, v3], chan4, [chan5, v5]]);

// Note: alts supports destructuing since it returns an object:
// {value: value, channel: channel}
// So we can do:
// var {channel} = yield alts(chan1, chan2)
// or var {channel, value} = yield alts(chan1, chan2);
// switch (channel) {
//  case chan1:
//  case chan2:
// }



var {
  Chan,
  Mult,
  timeout,
  go,
  alts
} = require('../../src/api-wrapper.js');

var ch1 = new Chan();

ch1.takeAsync((value)=>{console.log('Took: ${value}')});
ch1.putAsync(42, (value)=>{console.log('Put: ${value}')});
// => Took: 42

//
// var ch2 = new Chan();
//
// // buffering examples
// // fixed
// var ch2 = new Chan(1); // shorthand for new Chan(new Buffer('fixed', 3))
// ch2.asyncPut(1, (value)=>{console.log('Put: ${value}')})
// ch2.asyncPut(2, (value)=>{console.log('Put: ${value}')})
// ch2.asyncPut(3, (value)=>{console.log('Put: ${value}')})
// // dropping
// var ch2 = new Chan(new Buffer('dropping',1));
// ch2.asyncPut(1, (value)=>{console.log('Put: ${value}')})
// ch2.asyncPut(2, (value)=>{console.log('Put: ${value}')})
// ch2.asyncPut(3, (value)=>{console.log('Put: ${value}')})
// // sliding
// var ch2 = new Chan(new Buffer('sliding',1));
// ch2.asyncPut(1, (value)=>{console.log('Put: ${value}')})
// ch2.asyncPut(2, (value)=>{console.log('Put: ${value}')})
// ch2.asyncPut(3, (value)=>{console.log('Put: ${value}')})
//
// // go block example
