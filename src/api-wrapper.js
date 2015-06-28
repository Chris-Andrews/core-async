/* @flow */

"use strict";

var csp = require('./csp.js');
// var {TakeChannel, csp} = require('./api-TakeChannel.js');
var TakeChannel = require('./api-TakeChannel.js');

type Transducer = any;
type ExceptionHandler = (exception: Error)=>any;
type Buffer = {type: string, size: number};
type EventPair = [EventTarget | string, Event];

class Chan extends TakeChannel {
  _chan: any;
  constructor(bufferOrN?: number | Buffer, transducer?: any, exceptionHandler?: (x?:any)=>any) {
    super(bufferOrN, transducer, exceptionHandler);
  }

  put (value: any): ?any {return csp.put(this._chan, value)}
  putAsync (value: any, fn?: (x?:any)=>any) {
    if (typeof fn === 'function'){
      csp.putAsync(this._chan, value, fn)
    } else {
      csp.putAsync(this._chan, value, ()=>{})
    }
  }
  offer (value: any): boolean {return csp.offer(this._chan, value)}
  close() {
    // remove event listeners
    this._chan.close()
  }
  addEvent (): Chan {return this}
  removeEvent (): Chan {return this}
}

type TapOp = [Chan, boolean];
type AsyncFunction = (x: any, chan: Chan) => any;

class Mult {
  _mult: any;
  constructor(channel: Chan) {
    this._mult = csp.operations.mult(channel._chan);
  }
  // Accepts a Chan, multiple Chans, or an array of Chans
  tap (chan: any, ...rest: Array < Transducer | boolean >): Mult {return this}
  tapAsync(chan: any, asyncfn: (x?:any)=>any, keepOpen?: boolean = false,
    n?: number = 32): Mult {return this}
  untap (chan: any): Mult {return this}
  untapAll (): Mult {return this}
  reduce (fn: (x?:any)=>any, init: any): Go {return new Go(()=>{})}

  // reduce: returns a go-routine that puts the reduction on close of Chan?
  // untapping before close means it will no longer receive values and never put?

  // Close releases the consumed channel and distributes the closed value to taps
  // close () {/* Any mult-specific cleanup */}

}

// Helper function that will parse mix function syntax options:
var parseChannels = (arg,rest) => {
  if (arg instanceof Array) {
    return arg;
  } else {
    return [arg].concat(rest);
  }
}
class Mix extends TakeChannel {
  _chan: any;
  _mix: any;
  _events: any;
  constructor(bufferOrN?: number | Buffer, transducer?: Transducer, exceptionHandler?: ExceptionHandler) {
    super(bufferOrN, transducer, exceptionHandler);
    this._mix = csp.operations.mix(this._chan);
  }

  add(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    chanArray.forEach((c)=>{csp.operations.mix.add(this._mix, c._chan)});
    return this;
  }
  remove(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    chanArray.forEach((c)=>{csp.operations.mix.remove(this._mix, c._chan)});
    return this;
  }
  pause(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    var toggle_ops = chanArray.map((x)=>{[this._chan, {pause: true}]});
    csp.operations.mix.toggle(this._mix, toggle_ops);
    return this;
  }
  unpause(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    var toggle_ops = chanArray.map((x)=>{[this._chan, {pause: false}]});
    csp.operations.mix.toggle(this._mix, toggle_ops);
    return this;
  }
  mute(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    var toggle_ops = chanArray.map((x)=>{[this._chan, {mute: true}]});
    csp.operations.mix.toggle(this._mix, toggle_ops);
    return this;
  }
  unmute(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    var toggle_ops = chanArray.map((x)=>{[this._chan, {mute: true}]});
    csp.operations.mix.toggle(this._mix, toggle_ops);
    return this;
  }
  focus(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    var toggle_ops = chanArray.map((x)=>{[this._chan, {solo: true}]});
    csp.operations.mix.toggle(this._mix, toggle_ops);
    return this;
  }
  unfocus(arg: Chan | Array<Chan>, ...rest: Array<Chan>): Mix {
    var chanArray = parseChannels(arg,rest);
    var toggle_ops = chanArray.map((x)=>{[this._chan, {solo: false}]});
    csp.operations.mix.toggle(this._mix, toggle_ops);
    return this;
  }
  // setFocusMode(): Mix {return this}
  setFocusMode (mode: string): Mix  {
    var flag;
    switch (mode) {
      case 'mute':
        flag = csp.operations.mix.MUTE;
        break;
      case 'pause':
        flag = csp.operations.mix.PAUSE;
        break;
      default:
        throw new Error('Unrecognized focus mode: ' + mode);
    }
    csp.operations.mix.setSoloMode(this._mix, flag);
    return this;
  }
}



class Go extends TakeChannel {
  _chan: any;
  constructor(gen: (x?:any)=>any, args?: Array<any>) {
    super();
    this._chan = csp.go(gen, args);
  }
}

function go (gen: (x?:any)=>any, args?: Array<any>): Go {
  return new Go(gen, args);
}


class Timeout extends TakeChannel{
  _chan: any;
  constructor(msec: number) {
    super();
    this._chan = csp.timeout(msec);
  }
}
function timeout (msec: number): Timeout {
  return new Timeout(msec);
}



// Helper types and function for parsing alts/altsp arguments:
type PutOp = [Chan, any];
type TakeOp = Chan; // Chan | Mix
type ChanOp = PutOp | TakeOp;
function getOpsArray(op, rest) {
  var ops;
  if (op instanceof Chan) {
    ops = ([op].concat(rest): Array<ChanOp>);
  } else {
    if (rest.length) {
      ops = ([op].concat(rest): Array<ChanOp>);
    } else {
      ops = (op: Array<ChanOp>);
    }
  }
  var ops_array = [];



  // This needs to be a man that can take objects as keys
  // var chan_map = {};
  var chan_map = new Map();



  ops.forEach((op)=>{
    if (op instanceof Chan) {
      ops_array.push(op._chan);
      chan_map.set(op._chan,  op);
      // return op._chan;
    } else {
      var ch = op[0];
      var v = op[1];
      if (ch instanceof Chan) {
        ops_array.push([ch._chan, v]);
        chan_map.set(ch._chan, ch._chan);
        // return [ch._chan, v];
      }
    }
  })
  // var ops_array = ops.map((op)=>{
  //   if (op instanceof Chan) {
  //     return op._chan;
  //   } else {
  //     var ch = op[0];
  //     var v = op[1];
  //     if (ch instanceof Chan) {
  //       return [ch._chan, v];
  //     }
  //   }
  // });
  return {
    ops_array: ops_array,
    chan_map: chan_map
  };
}

class Alts extends Chan{
  _chan: any;
  constructor(chan, chan_map) {
    super();
    var _this = this;
    csp.go(function*(chan, chan_map, _this){
      var {channel, value} = yield chan;
      var chan = chan_map.get(channel);
      yield _this.put({channel: chan, value: value});
    },[chan, chan_map, _this])
    // this._chan = chan;
  }
}

var alts = function (op: Array<ChanOp> | ChanOp, ...rest: Array<ChanOp>): Alts {
  var ops;
  var {ops_array, chan_map} = getOpsArray(op, rest);

  var chan = csp.alts(ops_array);
  return new Alts(chan,chan_map);
  // var {channel, value} = csp.alts(ops_array);
  // console.log(channel);
  // return {
  //   channel: chan_map[channel],
  //   value: value,
  // };
  // return new Alts(chan);
};

// altsp = alts with priority based on order of operations
// var altsp = function (op: ChanOp | Array<ChanOp>, ...rest: Array<ChanOp>): any {
//   var ops;
//   var ops_array = getOpsArray(op, rest);
//   var chan = csp.alts(ops_array, {priority: true});
//   return new Alts(chan);
// };

// Helper function for parsing flush and close arguments
var getChanArray = (arg,rest) => {
  if (arg instanceof Array) {
    return arg;
  } else {
    return [arg].concat(rest);
  }
}

var close = (arg: Chan | Array<Chan>, ...rest:Array<Chan>) => {
  var chanArray = getChanArray(arg,rest);
  chanArray.forEach((c)=>{c.close();});
}

var flush = (arg: Chan | Array<Chan>, ...rest: Array<Chan>) => {
  var chanArray = getChanArray(arg,rest);
  chanArray.forEach((c)=>{c.flush();});
}

module.exports = {
  Chan: Chan,
  Mult: Mult,
  Mix: Mix,
  timeout: timeout,
  go: go,
  alts: alts,
  // altsp: altsp,
  close: close,
  flush: flush,
  csp: csp,
};

/*
TakeChannel becomes TakeChannel
Chan extends TakeChannel and adds put operations + events
Mix exetends TakeChannel and adds mixing operations
Mult takes a channel as input and has tap/pipe/reduce operations

Should TakeChannel implement pipe and pipeline?

Do you need pipe if you can:
new Mult(ch1).tap(ch2);

what about pipeline?
currently:
new Mult(new Mult(ch1).pipeline(buf,xf)).tap(ch2);
could be:
new Mult(ch1,buffer,xform).tap(ch2);
or:
new Mult(ch1).tap(ch2,buf,xf)??
ideal:
new Mult(ch1).tap(ch2, xf)

current csp code may not support closing Mults

*/


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

// Removed from mult:
// pipelineAsync (n: number, af: AsyncFunction, keepOpen: boolean = false) {

  /*
  do we want keepOpen to be true for pipelineAsync?
  async work could finish after the source Mult has closed
  need to look at the implementation of this
  could implement this differently; specifically, without closing the chan

  Alt implementation:
  create a new channel afnchan that taps this mult
  spawn a goroutine that takes from afnchan as soon as new items are
  available
  while value !== null, the goroutine will call asyncfn(value,outchan)
  asyncfn will put to outchan on completion (could put a value or an error)
  outchan is what we return to the user

  untapping would have to be handled specially, because outchan is not
  directly tapped
  could accomplish this by keeping track of the afnchans that correspond to
  each outchan

  Is this really a necessary function?
  without this function, the way to perform this action is to create a
  channel, spawn a goroutine that takes while channel is open, calls an
  async function on the value, and puts to another channel on completion. This
  is probably a better and more CSP-like method, since the goroutine is more
  transparent than a hidden async function. pipelineAsync also make assumptions
  about what type of function the user should supply that
  */
// }

// renaming onto putCollection so all of the simple put operations have the 'put' prefix
// putCollection (iterableCollection: Iterable) {} // returns a channel primative that closes on completion--implement as goroutine?
// [1,2,3].forEach((x,i,c)=>{(i===c.length) ? chan.putAsync(x,console.log('last take succeeded')) : chan.putAsync(x)})

// Alterative get/set interface (not currently supported by flow):
/*
get closed():boolean {return this._chan.closed}
set closed (value: boolean) {
  if (this.closed) {
    throw new Error('closed property cannot be set on a closed channel');
  } else if (value===true) {
    this.close();
    this.closed = true;
  } else if (value!==false) {
    throw new Error('Cannot set closed property to: ${value}');
  }
}
*/
// checkOpen() function call may be a more pure and understandable approach

// class Buffer {
//   type: string;
//   size: number;
//   constructor(type: string, size: number) {
//     var buffer;
//     switch (type) {
//       case 'fixed':
//         break;
//       case 'dropping':
//         if (size < 1) {
//           throw new Error('Dropping buffer size must be greater than 1');
//         }
//         break;
//       case 'sliding':
//         if (size < 1) {
//           throw new Error('Sliding buffer size must be greater than 1');
//         }
//         break;
//       default:
//         throw new Error('Unknown buffer type: ' + type);
//     }
//     this.type = type;
//     this.size = size;
//   }
// }


// function getOpsArray(op: Array<ChanOp> | ChanOp, rest: Array<ChanOp>) {
//   var ops = [];
//   if (rest.length) {
//     ops = [op].concat(rest);
//   }
//   else if (op instanceof Array) {
//     ops = (op: Array<ChanOp>);
//   }
//   var ops_array = ops.map((op)=>{
//     if (op instanceof Chan) {
//       return op._chan;
//     } else {
//       var ch = op[0];
//       var v = op[1];
//       if (ch instanceof Chan) {
//         return [ch._chan, v];
//       }
//     }
//   });
//   return ops_array;
// }


// tap(chan, af, 3, keepOpen)
// do we need n? it seems like its use was for parallism in clojure
// default n concurrency could be 32 (the size of the tasks buffer in dispatch.js)

// pipe (bufferOrN: number | Buffer, keepOpen: boolean = false) {/* returns a channel */}
// pipeline (bufferOrN: number | Buffer, xf: any, keepOpen: boolean = false) {
//   // returns a channel tapped to this Mult, transformed with xf
// }
