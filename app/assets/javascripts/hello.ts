export function hello(name: string) {
  return "Hello, " + name;
}

export function alertHello(name: string): void {
  alert("alert Hello, " + name);
}

export function fib(num: number): number[] {
  var result: number[] = [];
  for (var i = 1; i <= 5; i++) {
    result.push(fibonacchi(i));
  }
  return result;
}

function fibonacchi(num: number): number {
  if (num == 1) {
    return 1;
  } else if (num == 2) {
    return 2;
  } else {
    return fibonacchi(num - 2) + fibonacchi(num - 1);
  }
}
