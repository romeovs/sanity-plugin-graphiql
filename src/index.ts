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
 * import {myPlugin} from 'sanity-plugin-graphiql'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [myPlugin()],
 * })
 * ```
 */
export const myPlugin = definePlugin<GraphiQLToolConfig>(function (config) {
  return {
    name: 'sanity-plugin-graphiql',
    title: 'GraphiQL',
    tools: [
      {
        name: 'graphiql',
        title: 'GraphQL',
        icon: BlockElementIcon,
        component: GraphiQLTool,
        options: config,
      },
    ],
  }
})
