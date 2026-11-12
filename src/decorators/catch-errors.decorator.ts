type AnyMethod = (...args: any[]) => any;
type ErrorHandler = (error: unknown) => void;

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'then' in value &&
    typeof value.then === 'function'
  );
}

export function catch_errors(handler: ErrorHandler): MethodDecorator {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AnyMethod;

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      try {
        const result = originalMethod.apply(this, args);

        if (isPromiseLike(result)) {
          return Promise.resolve(result).catch((error: unknown) => {
            handler(error);
            return undefined;
          });
        }

        return result;
      } catch (error) {
        handler(error);
        return undefined;
      }
    };
  };
}
