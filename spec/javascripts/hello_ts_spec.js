/// <reference path="../../app/assets/typings/tsd.d.ts" />
/// <reference path="../../app/assets/typings/power-assert.d.ts" />
var assert = require('power-assert');
var Hello = require('../../app/assets/javascripts/hello');

var hello = Hello.hello;
var fib = Hello.fib;

describe('hello', function () {
    it('should return "Hello, name"', function () {
        assert(hello("Name") == "Hello, Name");
    });
});

describe('fib', function () {
    it('should return fibonacchi', function () {
        assert.deepEqual(fib(5), [1, 2, 3, 5, 8]);
        var ary = [-1, 2, 3, 5];
        assert.strictEqual(ary.indexOf(0), "-1");
    });
});
