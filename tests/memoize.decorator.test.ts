import { describe, expect, it, vi } from 'vitest';
import { memoize } from '../src/decorators/memoize.decorator';

describe('@memoize', () => {
  it('returns the cached result for repeated arguments', () => {
    const calculate = vi.fn((value: number) => value * 2);

    class Example {
      @memoize()
      calculate(value: number) {
        return calculate(value);
      }
    }

    const example = new Example();

    expect(example.calculate(4)).toBe(8);
    expect(example.calculate(4)).toBe(8);
    expect(calculate).toHaveBeenCalledOnce();
  });

  it('keeps separate cache entries for different arguments and instances', () => {
    const calculate = vi.fn((value: number) => value + 1);

    class Example {
      @memoize()
      calculate(value: number) {
        return calculate(value);
      }
    }

    new Example().calculate(1);
    new Example().calculate(1);
    new Example().calculate(2);

    expect(calculate).toHaveBeenCalledTimes(3);
  });
});
