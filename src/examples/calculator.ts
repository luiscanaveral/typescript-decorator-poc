import { catch_errors } from '../decorators/catch-errors.decorator';
import { debug } from '../decorators/debug.decorator';
import { execution_time } from '../decorators/execution-time.decorator';
import { log } from '../decorators/log.decorator';
import { memoize } from '../decorators/memoize.decorator';

export class Calculator {
  @log()
  @execution_time()
  @debug()
  add(a: number, b: number): number {
    return a + b;
  }

  @catch_errors((error) => {
    console.error('Handled error:', error);
  })
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }

    return a / b;
  }

  @memoize()
  expensiveSquare(value: number): number {
    return value * value;
  }
}
