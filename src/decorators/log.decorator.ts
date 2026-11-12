type AnyMethod = (...args: any[]) => any;

export function log(): MethodDecorator {
  return (_target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AnyMethod;
    const methodName = String(propertyKey);

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      console.log(`Calling ${methodName} with arguments:`, args);
      return originalMethod.apply(this, args);
    };
  };
}
