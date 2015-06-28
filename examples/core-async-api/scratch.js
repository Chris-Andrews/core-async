/* @flowz */

var {
  chan,
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
var ch1 = chan();
var ch2 = chan();
var ch3 = chan();
ch1.putAsync(1);
ch2.putAsync(2);
ch3.putAsync(3);
go(function*(){
  var {channel, value} = yield alts(ch1, ch2, ch3); // altsp returns 1 every time
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
  }
  console.log(`Value: ${value}`);
})


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
