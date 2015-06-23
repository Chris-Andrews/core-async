"use strict";

var csp = require("./csp.js");

class Buffer {
  constructor(type, size) {
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
      default:
        throw new Error('Unknown buffer type: ' + type);
    }
    this.type = type;
    this.size = size;
    this._buffer = buffer;
  }
}

class ChannelBase {
  constructor(bufferOrN, transducer, exceptionHandler) {
    //this._chan = csp.chan();
    //this.mix = new Mix(this._chan);
  }
  put () {}
  putAsync () {} // putAsync?
  onto (iterableCollection) {} // returns a channel that closes on completion
  offer () {}
  checkOpen () {}
  close() {}
}

class Chan extends ChannelBase {
  constructor(bufferOrN, transducer, exceptionHandler) {
    super(bufferOrN, transducer, exceptionHandler);
  }
  take () {}
  /*
  Note can modify process.js run method to add additional check for
  instanceof APIChannel that will allow 'yield chan' or 'yield timeout'
  to be implicit takes.
  */
  takeAsync () {}
  poll () {}
  flush () {
    let discard = csp.poll(this._chan);
    while (discard !== null) {
      discard = csp.poll(this._chan);
    }
  }
  isMixed () {}

}

class Mult extends ChannelBase {
  constructor(bufferOrN, transducer, exceptionHandler) {
    super(bufferOrN, transducer, exceptionHandler);
  }
  tap (chan, keepOpen) {
  }
  // pipe not necessary because of tap
  // pipe (dest, keepOpen) {}
  untap (chan) {
    // Create an intermediate channel for pipelines?
    // If we do we need to match that with the tap channel
    // so that we can remove them both together
    // Keep track of any taps or pipes and remove them
    // specifically
  }
  untapall () {
    // untapall
    // close all the taps
  }
  pipeline (chan, xf, keepOpen) {
    // ch = csp.chan(xf);
    // this.mult.tap(ch);
    // best way to send all the values?
    // use csp.pipe
    // add ch to this.mult._taps so that it can be closed
  }
  pipelineAsync (n, dest, af, keepOpen) {}
  split () {}

  /*
  Don't flush multichannels because any values put on an
  untapped mult will be immediately taken and not distributed
  to any channels. The only situation where values can
  accumulate is when the mult is waiting on one or more
  slow takers.
  */

  /*
  Could tap/untap while takes are pending be problematic?
  Mutate taps state while takes are still completing?
  This could be fixed by yielding to alts(taps,ch) so that
  the entire take cycle must complete or the tap/untap happens
  first.

  May need to apply similar logic to Mix add/remove
  */

}

var Chan = function(bufferOrN, transducer, exceptionHandler) {
  if (bufferOrN) {
    var buffer = (isFinite(bufferOrN) ? bufferOrN : bufferOrN._buffer);
  }

  this._chan = csp.chan(buffer, transducer, exceptionHandler);
  this._mix = csp.operations.mix(this._chan);

  this.put = value => csp.put(this._chan, value);
  this.take = () => csp.take(this._chan);

  this.asyncPut = (value, callback) => csp.putAsync(this._chan, value, callback);
  this.asyncPutIterable = (collection, callback) => {
    collection.forEach(item => csp.putAsync(this._chan, item, callback));
  };
  this.asyncTake = callback => {
    // check for consumer
    csp.takeAsync(this._chan, callback)
  }

  this.offer = (value) => csp.offer(this._chan,value);
  this.poll = () => csp.poll(this._chan);
  this.flush = () => {
    let discard = csp.poll(this._chan);
    while (discard !== null) {
      discard = csp.poll(this._chan);
    }
  };

  this.close = () => this._chan.close();
  this.checkOpen = () => !this._chan.closed;

};

var Mult = function() {
  tap: () => {},
  untap: () => {},
  untapall: () => {
    //untapall
    // close all the taps
  },
  pipe = (dest, keepOpen) => {};
  pipeline = (dest, xf, keepOpen) => {
    // ch = csp.chan(xf);
    // this.mult.tap(ch);
    // best way to send all the values?
    // use pipe
    // add ch to this.mult._taps so that it can be closed
  };
  pipelineAsync = (n, dest, af, keepOpen) => {};
  split = () => {};
}

class Mix {
  constructor(channel) {
    // this._chan = channel._chan;
    this._mix = csp.operations.mix(channel._chan);
  }
  // should the channel know whether it's mixed?
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
  Chan: Chan,
  Mult: Mult,
  Buffer: Buffer,
  timeout: timeout,
  go: csp.go,
  alts: alts,
};
