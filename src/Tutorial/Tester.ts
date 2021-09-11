import { AssertionError } from 'chai';
import { expect } from 'chai';

export class Tester {
  constructor(private counter = 0) { }
  run(code: string) {
    // eslint-disable-next-line
    return Function(`
      "use strict";
      return (function test(expect, errorHandler) {
        try {
          ${code}
        } catch(error) {
          errorHandler(error);
        }
      })
    `)()(
      (val: any) => {
        this.counter++;
        return expect(val);
      },
      (error: typeof AssertionError) => console.log(this.counter, error)
    )
  }
  reset() {
    this.counter = 0;
  }
}