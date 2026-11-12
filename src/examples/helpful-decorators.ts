import {
  bind,
  debounce,
  delay,
  measure,
  memo,
  once,
  throttle,
} from 'helpful-decorators';

/**
 * Examples from the helpful-decorators package.
 * These decorators are separate from the custom decorators in this POC.
 */
export class HelpfulDecoratorExamples {
  calls = 0;

  @once
  initialize(): number {
    this.calls += 1;
    return this.calls;
  }

  @memo()
  square(value: number): number {
    this.calls += 1;
    return value * value;
  }

  @measure
  add(a: number, b: number): number {
    return a + b;
  }

  @bind
  getLabel(): string {
    return `calls: ${this.calls}`;
  }

  @delay(10)
  delayedIncrement(): void {
    this.calls += 1;
  }

  @debounce(10)
  debouncedIncrement(): void {
    this.calls += 1;
  }

  @throttle(10)
  throttledIncrement(): void {
    this.calls += 1;
  }
}
