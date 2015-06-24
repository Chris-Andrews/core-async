/* @flow */

var {
  Chan,
  Mult,
  Buffer,
  timeout,
  go,
  alts
} = require('../../src/api-wrapper');

var ch1 = new Chan();

ch1.asyncTake((value)=>{console.log('Took: ${value}')});
ch1.asyncPut(42);
// => Took: 42

var ch2 = new Chan();

// buffering examples
// fixed
var ch2 = new Chan(1); // shorthand for new Chan(new Buffer('fixed', 3))
ch2.asyncPut(1, (value)=>{console.log('Put: ${value}')})
ch2.asyncPut(2, (value)=>{console.log('Put: ${value}')})
ch2.asyncPut(3, (value)=>{console.log('Put: ${value}')})
// dropping
var ch2 = new Chan(new Buffer('dropping',1));
ch2.asyncPut(1, (value)=>{console.log('Put: ${value}')})
ch2.asyncPut(2, (value)=>{console.log('Put: ${value}')})
ch2.asyncPut(3, (value)=>{console.log('Put: ${value}')})
// sliding
var ch2 = new Chan(new Buffer('sliding',1));
ch2.asyncPut(1, (value)=>{console.log('Put: ${value}')})
ch2.asyncPut(2, (value)=>{console.log('Put: ${value}')})
ch2.asyncPut(3, (value)=>{console.log('Put: ${value}')})

// go block example
