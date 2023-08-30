import {defineConfig} from '@sanity/pkg-utils'
import styles from 'rollup-plugin-styles'

export default defineConfig({
  legacyExports: true,
  dist: 'dist',
  tsconfig: 'tsconfig.dist.json',

  // Remove this block to enable strict export validation
  extract: {
    rules: {
      'ae-forgotten-export': 'off',
      'ae-incompatible-release-tags': 'off',
      'ae-internal-missing-underscore': 'off',
      'ae-missing-release-tag': 'off',
    },
  },
  rollup: {
    plugins: [
      // @ts-expect-error: TODO - why does this not work?
      styles({
        mode: 'inject',
      }),
    ],
  },
})
