/// <reference path="../../frontend/assets/typings/tsd.d.ts" />
/// <reference path="../../frontend/assets/typings/power-assert.d.ts" />

import assert = require('power-assert');
import Hello = require('../../frontend/assets/javascripts/hello');

var hello = Hello.hello;
var fib = Hello.fib;

describe('hello', () => {
  it('should return "Hello, name"', () => {
    assert(hello("Name") == "Hello, Name");
  })
});

describe('fib', () => {
  it('should return fibonacchi', () => {
    assert.deepEqual(fib(5), [1,2,3,5,8]);
    var ary = [-1,2,3,5];
    assert.strictEqual(ary.indexOf(0), "-1");
  })
});
