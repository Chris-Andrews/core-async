/* @flow */

// class Base {}
// class Cha extends Base {
//   close() {}
// }
// class Mi extends Base {
//   close() {}
// }

// class Base {}
// class Cha{
//   close() {}
// }
// class Mi{
//   close() {}
// }
//
// class Mul {
//   close() {}
// }

// type Closer = Cha | Mi | Mul | Array<any>;
class Base{
  a: number;
  b: number;
  constructor() {
    this.a = 1;
    this.b = 2;

  }
}
var fun = (input: Base | Array<Base>) => {
  if (input instanceof Base) {
  } else {
  }
}
