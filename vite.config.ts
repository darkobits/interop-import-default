import { vite } from '@darkobits/ts';


export default vite.library({
  test: {
    deps: {
      // Interestingly, Vitest has an option that will fix the very problem we
      // are trying to solve. In order to test this package, we need to disable
      // it.
      interopDefault: false
    }
  }
});
