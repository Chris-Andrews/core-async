"use strict";

var csp = require("./csp.js");

var Channel = function(bufferOrN, transducer, exceptionHandler) {
  if (bufferOrN) {
    var buffer = (isFinite(bufferOrN) ? bufferOrN : bufferOrN._buffer);
  }

  // var chan = csp.chan(buffer, transducer, exceptionHandler);
  this._chan = csp.chan(buffer, transducer, exceptionHandler);

  this._consumer = undefined;

  this.put = value => {csp.put(this._chan, value);};
  this.asyncPut = (value, callback) => {csp.putAsync(this._chan, value);};
  this.asyncPutCollection = () => {
    // use iterable interface to put values
  };
  this.take = () => csp.take(this._chan);
  this.asyncTake = callback => csp.takeAsync(this._chan, callback);


  // reduced and into functionality
  // use a side-effect causing reducing function?
  // map(x => {array.push(x); console.log(x)}) // x is defined in outer scope

  // Destination property?
  // If pipe is called with a pipe already active, what happens?
  // Want to avoid unpredictable takes caused by multiple pipe calls
  // Relevant methods include:
  /*
    - pipe
    - pipeline
    - pipelineAsync
    - split
    - merge
    - mult
    - pub
    - mix?

    Solution could be to allow these methods only if there
    consumer is undefined
  */

  this.pipe = (dest, keepOpen) => {};
  this.pipeline = (dest, xf, keepOpen) => {};
  this.pipelineAsync = (n, dest, af, keepOpen) => {};

  this.split = () => {};
  this.merge = () => {
    // call consumer on both channels
  };

  this.mult = () => {};

  this.pub = () => {};
  // this.sub = () => {};
  // publication has subscribe method

  this.mix = () => {};

  this.close = () => chan.close();
  this.checkOpen = () => !this._chan.closed;

};

var Buffer = function(type, size) {
  var buffer;
  switch type {
    case 'fixed':
      buffer = csp.buffers.fixed(size);
      break;
    case 'dropping':
      buffer = csp.buffers.dropping(size);
      break;
    case 'sliding':
      buffer = csp.buffers.sliding(size);
      break;
    case 'promise':
      if (size) {
        throw new Error('Promise buffer does not accept a size parameter');
      }
      buffer = csp.buffers.promise();
      break;
    default:
      throw new Error('Unknown buffer type: ' + type);
  }
  this.type = type;
  this.size = size;
  this._buffer = buffer;
}

var timeout = function(msec) {
  return {_chan: csp.timeout(msec)};
}


var alts = (...operations) => {
  var ops_array = operations.map((op) => {
    if (op instanceof Array) {
      return [op[0]._chan, op[1]];
    } else {
      return op._chan;
    }
  });
  csp.alts(ops_array);
};

module.exports = {
  Channel: Channel,
  Buffer: Buffer,
  timeout: timeout,
  go: csp.go,
  alts: alts,
};
