/* @flow */

"use strict";

var csp = require("./csp.js");

class Buffer {
  type: string;
  size: number;
  _buffer: any;
  constructor(type: string, size: number) {
    var buffer;
    switch (type) {
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
  _chan: any;
  mix: Mix;
  constructor(bufferOrN?: number | Buffer, transducer?: any, exceptionHandler?: function) {
    var buffer;
    if (bufferOrN) {
      var buffer = (bufferOrN instanceof Buffer ? bufferOrN._buffer : bufferOrN);
    }
    this._chan = csp.chan(buffer, transducer, exceptionHandler);
    this.mix = new Mix(this._chan);
  }
  put (value) {csp.put(this._chan, value)}
  putAsync (value, fn) {csp.putAsync(this._chan, value, fn)} // putAsync?
  onto (iterableCollection: Iterable) {} // returns a channel primative that closes on completion--implement as goroutine?
  offer (value) {csp.offer(this._chan, value)}
  subscribe() {}
  checkOpen () {return !this._chan.closed}
  close() {this._chan.close()}
}

class Chan extends ChannelBase {
  _chan: any;
  mix: Mix;
  constructor(bufferOrN?: number | Buffer, transducer?: any, exceptionHandler?: function) {
    super(bufferOrN, transducer, exceptionHandler);
  }
  take () {csp.take(this._chan)}
  takeAsync (fn: function) {csp.takeAsync(this._chan,fn)}
  poll () {csp.poll(this._chan)}
  flush () {
    var discard = csp.poll(this._chan);
    while (discard !== null) {
      discard = csp.poll(this._chan);
    }
  }
}

type TapOp = [Chan, boolean];
class Mult extends ChannelBase {
  constructor(bufferOrN: number | Buffer, transducer: any, exceptionHandler: function) {
    super(bufferOrN, transducer, exceptionHandler);
  }

  // Accepts: Chan and bool | array of chan and bools
  tap (chan: any, keepOpen: boolean) {}
  // Accepts a Chan, multiple Chans, or an array of Chans
  untap (chan: any) {}
  untapAll () {}
  pipe (bufferOrN: number | Buffer, keepOpen: boolean = false) {/* returns a channel */}
  pipeline (bufferOrN: number | Buffer, xf: any, keepOpen: boolean = false) {
    // returns a channel tapped to this Mult, transformed with xf
  }
  reduce (fn: function, init: any) {} // returns a go-routine that puts the reduction on close of Mult
  pipelineAsync (n: number, af: function, keepOpen: boolean) {}
}

class Mix {
  _mix: any;
  constructor(channel) {
    this._mix = csp.operations.mix(channel._chan);
  }
  // All of these functions accept a Chan, multiple Chans, or an array of Chans
  add (channel: Chan) {}
  remove (channel: Chan)  {}
  mute (...ch)  {}
  unmute (...ch)  {}
  pause (...ch)  {}
  unpause (...ch)  {}
  focus (...ch)  {}
  unfocus (...ch)  {}
  setFocusMode (mode)  {
    switch (mode) {
      case 'mute':
        break;
      case 'pause':
        break;
      default:
        throw new Error('Unrecognized focus mode: ' + mode);
    }
  }
}

class Go extends Chan {
  _chan: any;
  constructor(gen: function, args: Array<any>) {
    this._chan = csp.go(gen, args);
  }
}
function go (gen: function, args: Array<any>): Go {
  return new Go(gen, args);
}

class Timeout extends Chan{
  _chan: any;
  constructor(msec: number) {
    this._chan = csp.timeout(msec);
  }
}
function timeout (msec: number): Timeout {
  return new Timeout(msec);
}

class Alts extends Chan{
  _chan: any;
  constructor(chan) {
    this._chan = chan;
  }
}

type PutOp = [Chan, any];
type TakeOp = Chan;
type ChanOp = PutOp | TakeOp;

function getOpsArray(op, rest) {
  var ops;
  if (op instanceof Chan) {
    ops = ([op]: Array<ChanOp>);
    if (rest instanceof Array) {
      ops = (ops.concat(rest): Array<ChanOp>);
    }
  } else {
    if (rest instanceof Array) {
      ops = [op].concat(rest);
    } else {
      ops = (op: Array<ChanOp>);
    }
  }
  var ops_array = ops.map((op)=>{
    if (op instanceof Chan) {
      return op._chan;
    } else {
      var ch = op[0];
      var v = op[1];
      if (ch instanceof Chan) {
        return [ch._chan, v];
      }
    }
  });
  return ops_array;
}

// accepts an array of ChanOps or multiple ChanOps
var alts = (op: Array<ChanOp> | ChanOp, ...rest:Array<ChanOp>): Alts => {
  var ops;
  var ops_array = getOpsArray(op, rest);
  var chan = csp.alts(ops_array);
  return new Alts(chan);
};

// altsp = alts with priority
var altsp = (op: ChanOp | Array<ChanOp>, ...rest:Array<ChanOp>): Alts => {
  var ops;
  var ops_array = getOpsArray(op, rest);
  var chan = csp.alts(ops_array, {priority: true});
  return new Alts(chan);
};



// Create a flush convenience function that has similar type signature as alts
// flush(ch1,ch2,ch3) or flush(chan_array)
var flush = (chan: Chan | Array<Chan>) => {
  if (chan instanceof Chan) {
    chan.flush();
  } else {
    chan.forEach((ch) => ch.flush());
  }
}
var close = () => {}

// csp.operations.js reduce implementation
// 'true' argument never used? csp.go only accepts 2 argument
/*
function reduce(f, init, ch) {
  return go(function*() {
    var result = init;
    while (true) {
      var value = yield take(ch);
      if (value === CLOSED) {
        return result;
      } else {
        result = f(result, value);
      }
    }
  }, [], true);
}
*/


module.exports = {
  Chan: Chan,
  Mult: Mult,
  Buffer: Buffer,
  timeout: timeout,
  go: go,
  alts: alts,
  altsp: altsp,
  close: close,
  flush: flush,
};

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

May need to apply similar logic to Mix add/remove, which appears
to queue adds and removes by queuing them into a channel and yielding
to all mix sources and the state modifications
*/
