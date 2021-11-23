# NX + PHP Demo

> [No code is the best way to write **performant** software. Write nothing, deploy nowhere.](https://github.com/kelseyhightower/nocode)

Currently, large package based PHP projects (like Magento) suffer from long build times. Some of this is due to bad code, some is due to over-allocation to [higher levels of the testing pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), and some is attributable to the sheer volume of the codebase.

Fortunately, the last problem of "the codebase is large" is a solved problem. Tools like [NX](https://nx.dev/) and [Bazel](https://bazel.build/) leverage topological sorting of the dependency graph along with an intelligent build cache to only build, test, lint, and (insert your job here) the particular subgraph of the package graph that has changed.

## Prerequisites

* [Node.js v12+](https://nodejs.org/en/)
* [Nx v13.2.1](https://nx.dev/)
* [PHP v7.4](https://www.php.net/)
* [Composer v2](https://getcomposer.org/)

## Show me the code.

This demo uses `Nx` to highlight what graph-build tools do, and how they can be used with `php`.

```bash
git clone https://github.com/damienwebdev/demo-nx-php && cd demo-nx-php 
npm ci
composer install

# This is the first run, you have no cache.
npx nx run demo-nx-php/package-c:test

# This is the second run, you have cache.
npx nx run demo-nx-php/package-c:test
```

https://user-images.githubusercontent.com/9029654/142913178-8070580d-3d72-4141-a0e0-63dd547a39e1.mp4

### Comments

This showcases the flexibility of Nx across PHP, a currently undocumented language.