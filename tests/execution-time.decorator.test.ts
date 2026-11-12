import { describe, expect, it, vi } from 'vitest';
import { execution_time } from '../src/decorators/execution-time.decorator';

describe('@execution_time', () => {
  it('logs the method name and elapsed time', () => {
    class Example {
      @execution_time()
      work() {
        return 'done';
      }
    }

    const logger = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    expect(new Example().work()).toBe('done');
    expect(logger).toHaveBeenCalledWith(expect.stringMatching(/^work executed in \d+\.\d{2}ms$/));
  });

  it('logs elapsed time when an exception is thrown', () => {
    class Example {
      @execution_time()
      fail() {
        throw new Error('failure');
      }
    }

    const logger = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    expect(() => new Example().fail()).toThrow('failure');
    expect(logger).toHaveBeenCalledOnce();
  });
});
