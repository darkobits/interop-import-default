export interface InteropImportDefaultOptions {
  /**
   * If true, `interopImportDefault` will require that the provided argument is
   * an object. Any errors thrown (ex: by the Reflect API) will not be silently
   * ignored.
   */
  strict?: boolean;
}


/**
 * Provided an object T, determines if that value has a property key 'default'.
 * If so, returns its value as type T. Otherwise, returns the value as-is.
 *
 * If the provided value is not an object, it will returned as-is. If strict
 * mode is enabled, the function will throw for non-objects and any other errors
 * encountered.
 */
export function interopImportDefault<T>(packageExport: T, options: InteropImportDefaultOptions = {}): T {
  try {
    if (Reflect.has(packageExport as any, 'default')) {
      return Reflect.get(packageExport as any, 'default');
    }

    return packageExport;
  } catch (err: any) {
    if (options.strict) {
      throw new Error('[interopImportDefault] Unable to extract default export.', { cause: err });
    }

    // If not in strict mode, return the provided argument as-is.
    return packageExport;
  }
}
