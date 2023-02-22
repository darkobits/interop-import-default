import ow from 'ow';
import { describe, it, expect } from 'vitest';

import { interopImportDefault } from './interop-import-default';


describe('ow', () => {
  it('should have a broken default export', () => {
    expect(ow.array).toBeUndefined();
  });
});

describe('interopImportDefault', () => {
  describe('loose mode', () => {
    describe('when provided an object', () => {
      describe('without a "default" property', () => {
        it('should return the object as-is', () => {
          const value = {};
          expect(interopImportDefault(value)).toEqual(value);
        });
      });

      describe('with a "default" property', () => {
        it('should return the objects "default" property', () => {
          const value = { default: {} };
          expect(interopImportDefault(value)).toEqual(value.default);
        });
      });
    });

    describe('when provided a non-object', () => {
      it('should return the value as-is', () => {
        const value = Number.MAX_SAFE_INTEGER;
        expect(interopImportDefault(value)).toEqual(value);
      });
    });
  });

  describe('strict mode', () => {
    describe('when provided a non-object', () => {
      it('should throw', () => {
        const value = Number.MAX_SAFE_INTEGER;
        expect(() => {
          interopImportDefault(value, { strict: true });
        }).toThrow();
      });
    });
  });
});
