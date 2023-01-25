import { Constructor } from '@shared/types';

function handleError<T extends Error>(
  error: T,
  errorList: Constructor<T>[],
  handler: (arg0: T) => any,
) {
  if (!errorList.map((errorClass) => errorClass.name).includes(error.name))
    throw error;

  handler(error);
}

export function HandleErrors<T extends Error>(
  handler: (arg0: T) => any,
  ...errorList: Constructor<T>[]
): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);

        if (result instanceof Promise) {
          return result.catch((error: any) => {
            handleError(error, errorList, handler);
          });
        }

        return result;
      } catch (error) {
        return handleError(error, errorList, handler);
      }
    };

    return descriptor;
  };
}
