import { AssertionError } from 'chai';
import { expect } from 'chai';

export class Tester {
  private report = console.log;

  constructor({ counter, report } : { counter?: number, report?: (...args: any[]) => any }) {
    this.report = report === undefined ? this.report : report;
  }

  run(code: string, generateHints: boolean) : any {
    const errors: { error: Error, index: number, isKnown: boolean }[] = [];
    const getter = {
      get(target: any, key: string) : any {
        return new Proxy(new Function, getter);
      }
    }
    const fakeExpect = new Proxy({}, getter);
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
        if (generateHints) {
          errors.push({ error: Error(`failure #${counter}`), index: counter - 1, isKnown: true });
          return fakeExpect;
        }
        return expect(val);
      },
      (error: Error) => {
        if (!generateHints) {
          errors.push({ error, index: counter - 1, isKnown: error instanceof AssertionError });
        }
      },
    );
    if (generateHints) {
      return {
        total: counter,
        failures: errors,
      };
    }
    this.report({
      total: counter,
      failures: errors,
    });
  }
}