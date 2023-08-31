# sanity-plugin-graphiql

> This is a **Sanity Studio v3** plugin.

Add GraphiQL to your Sanity Studio.

![Screenshot](./screenshots/screen.png)

## Installation

```sh
npm install sanity-plugin-graphiql
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {graphiql} from 'sanity-plugin-graphiql'

export default defineConfig({
  //...
  plugins: [
    graphiql({
      version: 'v2023-08-01',
      dataset: 'production',
      tag: 'default',
    }),
  ],
})
```

## License

[MIT](LICENSE) © Romeo Van Snick

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/romeovs/sanity-plugin-graphiql/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
