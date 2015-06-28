/* @flowz */


require.ensure(['../../src/api-wrapper.js'],function(require) {


var {
  Chan,
  Mult,
  timeout,
  go,
  alts
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
// var ch1 = new Chan();
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
// var ch = new Chan();
// console.log(ch.offer(1));
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});
// console.log(ch.offer(1));
// var value = 42;
// console.log(ch.poll());
// ch.putAsync(value, ()=>{console.log(`Took: ${value}`)});
// console.log(ch.poll());


// // Flush:
// var ch = new Chan();
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
// var ch = new Chan();
// console.log(ch.checkOpen());
// var value = 'hello';
// ch.putAsync(value, (x)=>{console.log(`Put 1: ${value} Result: ${x}`)});
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});
// ch.close();
// console.log(ch.checkOpen());
// ch.putAsync(value, (x)=>{console.log(`Put 2: ${value} Result: ${x}`)});
// ch.takeAsync((x)=>{console.log(`Took: ${x}`)});


// // Goroutines:
// var ch1 = new Chan();
// // var ch2 = new Chan();
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
var ch1 = new Chan();
var ch2 = new Chan();
var ch3 = new Chan();
var ch4 = new Chan();
var ch5 = new Chan();
ch1.putAsync(1);
ch2.putAsync(2);
ch3.putAsync(3);
ch4.putAsync(4);
ch5.putAsync(5);
go(function*(){
  var {channel, value} = yield alts(ch1, ch2, ch3, ch4, ch5);
  switch (channel) {
    case ch1:
      console.log('Channel 1');
      break;
    case ch2:
      console.log('Channel 2');
      break;
    case ch3:
      console.log('Channel 3');
      break;
    case ch4:
      console.log('Channel 4');
      break;
    case ch5:
      console.log('Channel 5');
      break;
  }
  console.log(`Value: ${value}`);
})


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

// window.csp = require('../../src/csp.js');
// console.log(window.csp.chan);
})
