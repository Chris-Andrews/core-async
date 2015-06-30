/* @flowz */

var {
  Chan,
  Mix,
  timeout,
  go,
  alts,
  altsp
} = require('../../src/api-wrapper.js');


// window.Chan = Chan;
// window.Mult = Mult;
// window.timeout = timeout;
// window.go = go;
// window.alts = alts;

// // js-csp API
// var csp = require('../../src/csp');
// var ch = csp.chan();
// // Will complete:
// csp.takeAsync(ch, function(value) {  console.log("Got ", value); });
// csp.putAsync(ch, 42, function(){console.log('put')});
// // Will complete:
// csp.takeAsync(ch, function(value) {  console.log("Got ", value); });
// csp.putAsync(ch, 42);
// // NOTE: This will never complete--takeAsync requires callback:
// csp.takeAsync(ch);
// csp.putAsync(ch, 42, function(){console.log('put')});




// // Async put and take
// var ch1 = chan();
// var value = 42;
// ch1.takeAsync((x)=>{console.log(`Took: ${x}`)});
// ch1.putAsync(value, ()=>{console.log(`Put: ${value}`)});
// // => Put: 42
// // => Took: 42


// // Timeout channel
// timeout(1500).takeAsync((x)=>{console.log('Timeout')});
// // After 1.5 seconds
// // => Timeout


// // Offer and Poll:
// var ch = chan();
// console.log(ch.offer(1));
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});
// console.log(ch.offer(1));
// var value = 42;
// console.log(ch.poll());
// ch.putAsync(value, ()=>{console.log(`Took: ${value}`)});
// console.log(ch.poll());


// // Flush:
// var ch = chan();
// var value = 42;
// ch.putAsync(value, ()=>{console.log(`Put: ${value}`)});
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});
// // => Took: 42
// // => Put: 42
// ch.putAsync(value, ()=>{console.log(`Put: ${value}`)});
// ch.flush();
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});
// // => Put: 42


// // Close:
// var ch = chan();
// console.log(ch.checkOpen());
// var value = 'hello';
// ch.putAsync(value, (x)=>{console.log(`Put 1: ${value} Result: ${x}`)});
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});
// ch.close();
// console.log(ch.checkOpen());
// ch.putAsync(value, (x)=>{console.log(`Put 2: ${value} Result: ${x}`)});
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});


// // Goroutines:
// var ch1 = chan();
// // var ch2 = chan();
// go(function*(){
//   var i = 1;
//   while (yield ch1.put(i)) {
//     i++;
//   }
// })
// go(function*(){
//   var i = 0;
//   while (i < 3) {
//     var value = yield ch1;
//     console.log(`Took: ${value}`);
//     i++;
//   }
// })


// Alts:
// var ch1 = new Chan();
// var ch2 = new Chan();
// var ch3 = new Chan();
// ch1.putAsync(1);
// ch2.putAsync(2);
// ch3.putAsync(3);
// go(function*(){
//   var {channel, value} = yield alts(ch1, ch2, ch3); // altsp returns 1 every time
//   switch (channel) {
//     case ch1:
//       console.log('Channel 1');
//       break;
//     case ch2:
//       console.log('Channel 2');
//       break;
//     case ch3:
//       console.log('Channel 3');
//       break;
//   }
//   console.log(`Value: ${value}`);
// })


// // Mix:
// var mix = new Mix();
//
// var inChan1 = new Chan(),
//     inChan2 = new Chan(),
//     inChan3 = new Chan();
//
// mix.add(inChan1);
// mix.add(inChan2);
// mix.add(inChan3);
//
// // Let's listen to values that `outCh` receives
// go(function*(){
//     var value = yield mix;
//     while (value !== null) {
//         console.log("Got ", value);
//         value = yield mix;
//     }
// });
//
//
// // By default, every value put in the input channels will come out in `outCh`
// inChan1.putAsync(1);
// //=> "Got 1"
// inChan2.putAsync(2);
// //=> "Got 2"
// inChan3.putAsync(3);
// //=> "Got 3"
//
// // Let's pause `inChan2` and see what happens
// mix.pause(inChan2);
//
// inChan1.putAsync(1);
// //=> "Got 1"
// inChan2.putAsync(2); // `outCh` won't receive this value (yet)
// inChan3.putAsync(3);
// //=> "Got 3"
//
// mix.unpause(inChan2);
// //=> "Got 2"
//
// // Let's see how muting `inChan2` discards the values put into it
// mix.mute(inChan2);
//
// inChan1.putAsync(1);
// //=> "Got 1"
// inChan2.putAsync(2); // `outCh` will never receive this value
// inChan3.putAsync(3);
// //=> "Got 3"
//
// mix.unmute(inChan2);
//
//
// // Let's see how solo-ing channels implies (by default) muting the rest
// mix.focus(inChan1, inChan2);
//
// inChan1.putAsync(1);
// //=> "Got 1"
// inChan2.putAsync(2);
// //=> "Got 2"
// inChan3.putAsync(3); // `outCh` will never receive this value
//
// mix.unfocus(inChan1, inChan2);
//
// // Let's see how we can configure the state of non-soloed channels to pause instead of mute
// mix.setFocusMode('pause');
// mix.focus(inChan1);
//
// inChan1.putAsync(1);
// //=> "Got 1"
// inChan2.putAsync(2); // `outCh` won't receive this value (yet)
// inChan3.putAsync(3); // `outCh` won't receive this value (yet)
//
// mix.unfocus(inChan1);
// //=> "Got 2"
// //=> "Got 3"
//
// mix.removeAll();



// // Buffering
// // Fixed
// var ch = chan(1); // shorthand for chan(new Buffer('fixed', 3))
// ch.putAsync(1, ()=>{console.log(`Put: ${1}`)})
// ch.putAsync(2, ()=>{console.log(`Put: ${2}`)})
// ch.putAsync(3, ()=>{console.log(`Put: ${3}`)})
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// // Dropping
// var ch = chan({type:'dropping',size:1});
// ch.putAsync(1, ()=>{console.log(`Put: ${1}`)})
// ch.putAsync(2, ()=>{console.log(`Put: ${2}`)})
// ch.putAsync(3, ()=>{console.log(`Put: ${3}`)})
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// // Sliding
// var ch = chan({type:'sliding',size:1});
// ch.putAsync(1, ()=>{console.log(`Put: ${1}`)})
// ch.putAsync(2, ()=>{console.log(`Put: ${2}`)})
// ch.putAsync(3, ()=>{console.log(`Put: ${3}`)})
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});
// ch.takeAsync((value)=>{console.log(`Took: ${value}`)});


// // Event listeners
// var buf = {type:'sliding',size:1};
// window.ch = new Chan(buf).addEvent(['body','mousemove']);
// go(function*(){
//   var e = yield window.ch;
//   while (e !== null) {
//     console.log(`Took: ${e}`);
//     var e = yield window.ch;
//   }
// });
// // Closing the channel in console will stop printing mouse events



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
