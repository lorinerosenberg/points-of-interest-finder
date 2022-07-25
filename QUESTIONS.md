# Questions

Q1: Explain the output of the following code and why

```js
setTimeout(function () {
  console.log("1");
}, 100);
console.log("2");
```

A:1

```
Output: 2
Output: 1

Why: `console.log('1')` is called inside of a setTimeout so after the 100ms timeout it will be sent to the end of the callback queue and will be triggered after `console.log('2')`

```

Q2: Explain the output of the following code and why

```js
function foo(d) {
  if (d < 10) {
    foo(d + 1);
  }
  console.log(d);
}
foo(0);
```

A:2

```
Output: 10 9 8 7 6 5 4 3 2 1 0

Why: `foo(d)` will be recursively called until the `d<10` conditional is `false`. It will be false when `10` is passed into `foo` so `foo` (and therefere `console.log(d)`) will be called 10 times (incl the first call).

```

Q3: If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```js
function foo(d) {
  d = d || 5;
  console.log(d);
}
```

A:3

```
Why: Since `0` is a falsey value, if we pass into `foo` the response will be `5` rather than `0` (which is a valid number)
```

Q4: Explain the output of the following code and why

```js
function foo(a) {
  return function (b) {
    return a + b;
  };
}
var bar = foo(1);
console.log(bar(2));
```

A:4

```
Output: 3

Why: This is a closure function. This means that it gives the inner function access to the state of the outer function and it will be persisted. i.e. calling `bar` will give it access to the persisted state of `foo()`. This state is persisted as everytime we will call `bar()` this state will be saved within its scope.
Calling `foo()` followed by `bar()` creates and instance of the function declared inside `foo` and `bar()` will have access to whatever variables/state had been saved in the `foo()` function.
```

Q5: Explain how the following function would be used

```js
function double(a, done) {
  setTimeout(function () {
    done(a * 2);
  }, 100);
}
```

A:5

```
Why: A callback function will need to be passed into the `done` param. This function will be triggered when `done` is called in `double`. This can be a named function or an anonymous function.
This function will continue to be triggered until the timeout has finished.
eg: double(2, n => n+n)
```
