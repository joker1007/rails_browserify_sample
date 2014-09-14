interface PowerAssert {
  (value: any, message?: string): void;
  ok(value: any, message?: string): void;
  equal(actual: any, expected: any, message?: string): void;
  notEqual(actual: any, expected: any, message?: string): void;
  strictEqual(actual: any, expected: any, message?: string): void;
  notStrictEqual(actual: any, expected:any, message?: string): void;
  deepEqual(actual: any, expected: any, message?: string): void;
  notDeepEqual(actual: any, expected: any, message?: string): void;
}

declare var assert: PowerAssert;

declare module "power-assert" {
  export = assert;
}
