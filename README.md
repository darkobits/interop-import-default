<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://github.com/darkobits/interop-import-default/assets/441546/e0428430-0a46-41ba-b05a-d829e0e9f296"
      width="100%"
    >
    <img
      src="https://github.com/darkobits/interop-import-default/assets/441546/202dc310-db00-4b70-be03-0165f944ccd1"
      width="100%"
    >
  </picture>
</p>
<p align="center">
  <a
    href="https://www.npmjs.com/package/@darkobits/interop-import-default"
  ><img
    src="https://img.shields.io/npm/v/@darkobits/interop-import-default.svg?style=flat-square"
  ></a>
  <a
    href="https://github.com/darkobits/interop-import-default/actions?query=workflow%3Aci"
  ><img
    src="https://img.shields.io/github/actions/workflow/status/darkobits/interop-import-default/ci.yml?style=flat-square"
  ></a>
  <a
    href="https://app.codecov.io/gh/darkobits/interop-import-default/branch/master"
  ><img
    src="https://img.shields.io/codecov/c/github/darkobits/interop-import-default/master?style=flat-square&color=brightgreen"
  ></a>
  <a
    href="https://depfu.com/repos/github/darkobits/interop-import-default"
  ><img
    src="https://img.shields.io/depfu/darkobits/interop-import-default?style=flat-square"
  ></a>
  <a
    href="https://conventionalcommits.org"
  ><img
    src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"
  ></a>
  <a
    href="https://firstdonoharm.dev"
  ><img
    src="https://img.shields.io/static/v1?label=license&message=hippocratic&style=flat-square&color=753065"
  ></a>
</p>

# Install

```
$ npm i @darkobits/interop-import-default
```

# Use

This function is intended to gracefully address issues with the default exports of packages that may
have been transpiled/bundled improperly or were simply transpiled to run in an environment that has
built-in support for addressing this kind of issue.

This problem can often rear its head when working in mixed CJS / ESM environments.

### Before / Ideal:

```ts
import wonky from 'wonky';

// Use `wonky` as the developer intended.
```

Sometimes, based on the Node version running this code and how the code was transpiled/bundled, a
package's default export may be on a property key `default` on the value imported.

### Naive TypeScript Fix:

```ts
import wonkyExport from 'wonky';
const wonky = wonkyExport.default;

// Now, typeof wonky is incorrect; IntelliSense is broken, and
// TypeScript will throw errors.
```

Furthermore, you may run into cases where your code behaves differently in different runtime
environments, especially if you are authoring a library and you don't know how your code will be
transpiled by the end user. Some bundlers have built-in interop features that address this issue, but
running the same code in Node will produce an error.

Even worse, TypeScript can miss this error at compile-time, mistakenly thinking that the default
export of a package is the value we expected it to be rather than an object with a nested `default`
property.

This function is designed to be used as a **runtime dependency** that will address both of these\
problems. First, it ensures your code runs the same way in both types of environments by returning the
provided value as-is if it doesn't contain a `default` key. Second, it type-casts the return value as
the type of the parameter provided, so TypeScript will always be happy. 🌈

```ts
import wonkyExport from 'wonky';
import { interopImportDefault } from '@darkobits/interop-import-default';

const wonky = interopImportDefault(wonkyExport);

// Use `wonky` as the developer intended.
```

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png" style="max-width: 100%;">
</a>
