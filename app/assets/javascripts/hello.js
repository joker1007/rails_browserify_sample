function hello(name) {
    return "Hello, " + name;
}
exports.hello = hello;

function alertHello(name) {
    alert("alert Hello, " + name);
}
exports.alertHello = alertHello;

function fib(num) {
    var result = [];
    for (var i = 1; i <= 5; i++) {
        result.push(fibonacchi(i));
    }
    return result;
}
exports.fib = fib;

function fibonacchi(num) {
    if (num == 1) {
        return 1;
    } else if (num == 2) {
        return 2;
    } else {
        return fibonacchi(num - 2) + fibonacchi(num - 1);
    }
}
