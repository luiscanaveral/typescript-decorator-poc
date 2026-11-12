type AnyMethod = (...args: any[]) => any;

function createCacheKey(args: unknown[]): string {
  return JSON.stringify(args);
}

export function memoize(): MethodDecorator {
  const caches = new WeakMap<object, Map<string, unknown>>();
  const sharedCache = new Map<string, unknown>();

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AnyMethod;
    const methodName = String(propertyKey);

    descriptor.value = function (this: object, ...args: unknown[]) {
      const cache = this && typeof this === 'object'
        ? getInstanceCache(this, caches, methodName)
        : sharedCache;
      const key = createCacheKey(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };
}

function getInstanceCache(
  instance: object,
  caches: WeakMap<object, Map<string, unknown>>,
  methodName: string,
): Map<string, unknown> {
  let cache = caches.get(instance);

  if (!cache) {
    cache = new Map<string, unknown>();
    caches.set(instance, cache);
  }

  // Keep each decorated method's cache separate when a class has multiple
  // memoized methods with the same argument list.
  const methodCacheKey = `__method__${methodName}`;
  const methodCache = cache.get(methodCacheKey);

  if (methodCache instanceof Map) {
    return methodCache;
  }

  const newMethodCache = new Map<string, unknown>();
  cache.set(methodCacheKey, newMethodCache);
  return newMethodCache;
}
