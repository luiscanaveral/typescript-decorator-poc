import { describe, expect, it, vi } from 'vitest';
import { HelpfulDecoratorExamples } from '../src/examples/helpful-decorators';

describe('helpful-decorators examples', () => {
  it('@once runs a method only once', () => {
    const example = new HelpfulDecoratorExamples();

    expect(example.initialize()).toBe(1);
    expect(example.initialize()).toBe(1);
    expect(example.calls).toBe(1);
  });

  it('@memo caches a result for the same arguments', () => {
    const example = new HelpfulDecoratorExamples();

    expect(example.square(4)).toBe(16);
    expect(example.square(4)).toBe(16);
    expect(example.calls).toBe(1);
  });

  it('@bind keeps the instance when a method is detached', () => {
    const example = new HelpfulDecoratorExamples();
    example.calls = 3;

    const getLabel = example.getLabel;

    expect(getLabel()).toBe('calls: 3');
  });

  it('@delay executes after the configured timeout', () => {
    vi.useFakeTimers();
    const example = new HelpfulDecoratorExamples();

    example.delayedIncrement();
    expect(example.calls).toBe(0);

    vi.advanceTimersByTime(10);
    expect(example.calls).toBe(1);
    vi.useRealTimers();
  });

  it('@debounce executes only the latest call', () => {
    vi.useFakeTimers();
    const example = new HelpfulDecoratorExamples();

    example.debouncedIncrement();
    example.debouncedIncrement();
    vi.advanceTimersByTime(10);

    expect(example.calls).toBe(1);
    vi.useRealTimers();
  });

  it('@throttle limits calls during the throttle window', () => {
    vi.useFakeTimers();
    const example = new HelpfulDecoratorExamples();

    example.throttledIncrement();
    example.throttledIncrement();

    expect(example.calls).toBe(1);
    vi.advanceTimersByTime(10);
    vi.useRealTimers();
  });
});
