import {lazy} from 'react'
import {definePlugin} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {GraphiQLToolConfig} from './types'

const GraphiQLTool = lazy(() => import('./component'))

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {graphiQLTool} from 'sanity-plugin-graphiql'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [
 *    graphiQLTool({
 *      version: 'v2023-08-01',
 *      dataset: 'production',
 *      tag: 'default',
 *    }),
 *  ],
 * })
 * ```
 */
export const graphiQLTool = definePlugin<GraphiQLToolConfig>(function (config) {
  return {
    name: 'sanity-plugin-graphiql',
    title: 'GraphiQL',
    tools: [
      {
        name: 'graphiql',
        title: 'GraphiQL',
        icon: BlockElementIcon,
        component: GraphiQLTool,
        options: config,
      },
    ],
  }
})
