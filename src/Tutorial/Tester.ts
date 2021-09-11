import { AssertionError } from 'chai';
import { expect } from 'chai';

export class Tester {
  private counter = 0;
  private report = console.log;

  constructor({ counter, report } : { counter?: number, report?: (...args: any[]) => any }) {
    this.counter = counter === undefined ? this.counter : counter;
    this.report = report === undefined ? this.report : report;
  }

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
      (error: Error) => this.report({ index: this.counter, error, isKnownError: error instanceof AssertionError }),
    )
  }
  reset() {
    this.counter = 0;
  }
}