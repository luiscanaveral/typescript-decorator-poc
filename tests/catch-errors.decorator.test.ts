import { describe, expect, it, vi } from 'vitest';
import { catch_errors } from '../src/decorators/catch-errors.decorator';

describe('@catch_errors', () => {
  it('passes synchronous exceptions to the supplied handler', () => {
    const handler = vi.fn();

    class Example {
      @catch_errors(handler)
      fail() {
        throw new Error('sync failure');
      }
    }

    expect(new Example().fail()).toBeUndefined();
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ message: 'sync failure' }));
  });

  it('passes rejected promises to the supplied handler', async () => {
    const handler = vi.fn();

    class Example {
      @catch_errors(handler)
      async fail() {
        throw new Error('async failure');
      }
    }

    await expect(new Example().fail()).resolves.toBeUndefined();
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ message: 'async failure' }));
  });
});
