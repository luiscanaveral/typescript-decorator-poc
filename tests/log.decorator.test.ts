import { describe, expect, it, vi } from 'vitest';
import { log } from '../src/decorators/log.decorator';

describe('@log', () => {
  it('logs the method name and arguments while preserving the result', () => {
    class Example {
      @log()
      add(a: number, b: number) {
        return a + b;
      }
    }

    const logger = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    expect(new Example().add(2, 3)).toBe(5);
    expect(logger).toHaveBeenCalledWith('Calling add with arguments:', [2, 3]);
  });
});
