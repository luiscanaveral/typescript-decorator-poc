# TypeScript Decorator POC

This project demonstrates method decorators using TypeScript's legacy decorator syntax, as described in the [Apify TypeScript decorators article](https://blog.apify.com/using-decorators-in-typescript/).

## Decorators

- `@log()` logs a method call and its arguments.
- `@catch_errors(handler)` catches synchronous exceptions and rejected promises and passes them to `handler`.
- `@execution_time()` logs how long a method takes to complete.
- `@memoize()` caches results by method arguments. The cache is isolated per instance.
- `@debug()` logs the method name, arguments, and return value.

## Run

```bash
npm install
npm test
npm run build
```

The example usage is in `src/examples/calculator.ts`.

## `helpful-decorators` examples

The project also includes the [`helpful-decorators`](https://github.com/NetanelBasal/helpful-decorators) library:

```ts
import { HelpfulDecoratorExamples } from './src/examples/helpful-decorators';

const example = new HelpfulDecoratorExamples();

example.initialize();          // @once: runs once
example.square(4);             // @memo(): caches the result
example.delayedIncrement();    // @delay(10): runs after 10ms
example.debouncedIncrement();  // @debounce(10): coalesces rapid calls
example.throttledIncrement();  // @throttle(10): limits call frequency

const getLabel = example.getLabel; // @bind: safe to pass as a callback
console.log(getLabel());
```

Available library decorators demonstrated here are `once`, `memo`, `measure`, `bind`, `delay`, `debounce`, and `throttle`.
