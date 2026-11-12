type AnyMethod = (...args: any[]) => any;

export function debug(): MethodDecorator {
  return (_target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AnyMethod;
    const methodName = String(propertyKey);

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      console.log(`[DEBUG] ${methodName} called with`, args);
      const result = originalMethod.apply(this, args);
      console.log(`[DEBUG] ${methodName} returned`, result);
      return result;
    };
  };
}
