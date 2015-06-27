/* @flow */

var csp = require("./csp.js");


type Transducer = any;
type ExceptionHandler = (exception: Error)=>any;
type Buffer = {type: string, size: number};

class TakeChannel {
  _chan: any;
  constructor(bufferOrN?: number | Buffer, transducer?: Transducer, exceptionHandler?: ExceptionHandler) {
    var buffer;
    if (bufferOrN) {
      if ((typeof bufferOrN)==='number'){
        buffer = csp.buffers.fixed(bufferOrN);
      } else {
        if ((typeof bufferOrN.size !== 'number') || (bufferOrN.size < 1)) {
          throw new Error('Buffer size must be number greater than 1');
        }
        switch (bufferOrN.type) {
          case 'fixed':
            buffer = csp.buffers.fixed(bufferOrN.size);
            break;
          case 'dropping':
            buffer = csp.buffers.dropping(bufferOrN.size);
            break;
          case 'sliding':
            buffer = csp.buffers.sliding(bufferOrN.size);
            break;
          default:
            throw new Error('Unknown buffer type: ' + bufferOrN.type);
        }
      }
    }
    this._chan = csp.chan(buffer, transducer, exceptionHandler);
  }

  take (): ?any {return csp.take(this._chan)}
  takeAsync (fn?: (x:any)=>any) {return csp.takeAsync(this._chan,fn)}
  poll (): ?any {return csp.poll(this._chan)}
  flush () {
    var discard = csp.poll(this._chan);
    while (discard !== null) {
      discard = csp.poll(this._chan);
    }
  }
  checkOpen (): boolean {return this._chan.closed};
}

module.exports = TakeChannel;
