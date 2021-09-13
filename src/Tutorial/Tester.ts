import { AssertionError } from 'chai';
import { expect } from 'chai';

export class Tester {
  private report = console.log;

  constructor({ counter, report } : { counter?: number, report?: (...args: any[]) => any }) {
    this.report = report === undefined ? this.report : report;
  }

  run(code: string) {
    const errors: { error: Error, index: number, isKnown: boolean }[] = [];
    let counter = 0;
    // eslint-disable-next-line
    const result = Function(`
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
        counter++;
        return expect(val);
      },
      (error: Error) => {
        errors.push({ error, index: counter - 1, isKnown: error instanceof AssertionError });
      },
    );
    this.report({
      total: counter,
      failures: errors,
    });
  }
}