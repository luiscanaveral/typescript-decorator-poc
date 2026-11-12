import { describe, expect, it, vi } from 'vitest';
import { debug } from '../src/decorators/debug.decorator';

describe('@debug', () => {
  it('logs the function name, arguments, and return value', () => {
    class Example {
      @debug()
      multiply(a: number, b: number) {
        return a * b;
      }
    }

    const logger = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    expect(new Example().multiply(3, 4)).toBe(12);
    expect(logger).toHaveBeenNthCalledWith(1, '[DEBUG] multiply called with', [3, 4]);
    expect(logger).toHaveBeenNthCalledWith(2, '[DEBUG] multiply returned', 12);
  });
});
