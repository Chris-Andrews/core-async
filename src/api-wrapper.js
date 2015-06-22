"use strict";

var csp = require("./csp.js");

var Channel = function(bufferOrN, transducer, exceptionHandler) {
  if (bufferOrN) {
    var buffer = (isFinite(bufferOrN) ? bufferOrN : bufferOrN._buffer);
  }

  /*
  "chan" is the true channel of this object, however, we won't act on it
  directly because this channel implementation will have a mult by default.

  These channels can operate in linear fashion (single puts and takes), or with
  one or more consumers (taps, pipes, pipelines, etc). Standard takes and
  asyncTakes can only be performed if there are no consumers of a channel.
  Otherwise, takes succeed only when all consumers are able to take from a mult
  channel.

  This will add some overhead to performance, but will be useful for exploring
  this API. If the performance of simpler channels is needed in the future, the
  implementations could be divided into separate classes, e.g. Channel and
  MultChannel. One consideration of doing this is that the current
  implementation allows us to pipe to a channel and later pipe to another. This
  is accomplished due to the untapall function of the mult.

  */
  var chan = csp.chan(buffer, transducer, exceptionHandler);
  this._chan = csp.chan();
  this._mix = csp.operations.mix(this._chan);
  this._mult = csp.operations.mult(chan);

  this.mult = {
    tap: () => {},
    untap: () => {},
    untapall: () => {
      //untapall
      //tap this._chan;
    },
    pipe = (dest, keepOpen) => {};
    pipeline = (dest, xf, keepOpen) => {
      // ch = csp.chan(xf);
      // this.mult.tap(ch);
      // best way to send all the values?
    };
    pipelineAsync = (n, dest, af, keepOpen) => {};
    split = () => {};
    hasConsumer = false;
  };
  this.mult.tap(this._chan);

  this.mix = {
    add: () => {/*check hasConsumer ... or is mult?*/},
    remove: () => {},
    mute: (...ch) => {},
    unmute: (...ch) => {},
    pause: (...ch) => {},
    unpause: (...ch) => {},
    focus: (...ch) => {},
    unfocus: (...ch) => {},
    setFocusMode: (mode) => {
      switch mode {
        case: 'mute'
          break;
        case: 'pause'
          break;
        default:
          throw new Error('Unrecognized focus mode: ' + mode);
      }
    },
  };

  this.asyncPut = (value, callback) => csp.putAsync(chan, value, callback);
  this.asyncPutIterable = (collection, callback) => {
    collection.forEach(item => csp.putAsync(chan, item, callback));
  };
  this.asyncTake = callback => {
    // check for consumer
    csp.takeAsync(chan, callback)
  }

  this.offer = (value) => csp.offer(chan,value);
  this.poll = () => {
    // check for consumer
    csp.poll(chan);
  }
  this.flush = () => {
    let discard = csp.poll(chan);
    while (discard !== null) {
      discard = csp.poll(chan);
    }
  };

  this.put = value => {csp.put(chan, value);};
  this.take = () => {
    // check for consumer
    csp.take(chan)
  }


  // reduced and into functionality
  // use a side-effect causing reducing function?
  // map(x => {array.push(x); console.log(x)}) // x is defined in outer scope

  // pub-sub can be re-created from mult+transducers
  // this.pub = () => {};
  // this.sub = () => {};
  // publication has subscribe method?

  // Merging is relatively simple using mix(ers)
  // this.merge = () => {
  //   // call consumer on both channels
  // };




  this.close = () => chan.close();
  this.checkOpen = () => !chan.closed;

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
    // case 'promise':
    //   if (size) {
    //     throw new Error('Promise buffer does not accept a size parameter');
    //   }
    //   buffer = csp.buffers.promise();
    //   break;
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
