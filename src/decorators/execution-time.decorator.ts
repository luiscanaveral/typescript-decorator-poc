type AnyMethod = (...args: any[]) => any;

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'then' in value &&
    typeof value.then === 'function'
  );
}

export function execution_time(): MethodDecorator {
  return (_target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AnyMethod;
    const methodName = String(propertyKey);

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      const start = performance.now();

      const report = () => {
        const elapsed = (performance.now() - start).toFixed(2);
        console.log(`${methodName} executed in ${elapsed}ms`);
      };

      try {
        const result = originalMethod.apply(this, args);

        if (isPromiseLike(result)) {
          return result.then(
            (value) => {
              report();
              return value;
            },
            (error) => {
              report();
              throw error;
            },
          );
        }

        report();
        return result;
      } catch (error) {
        report();
        throw error;
      }
    };
  };
}
