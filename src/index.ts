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
 *      apiVersion: '2021-10-21',
 *
 *      // use a custom graphql api, disable the api selector in the tool.
 *      url,
 *
 *      // override the default tool name
 *      name: 'graphiql',
 *
 *      // override the default tool title
 *      title: 'GraphiQL',
 *
 *      // override the default tool icon
 *      icon: BlockElementIcon,
 *
 *      // set the default query
 *      defaultQuery: 'query { ... }'
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
        name: config.name ?? 'graphiql',
        title: config.title ?? 'GraphiQL',
        icon: config.icon ?? BlockElementIcon,
        component: GraphiQLTool,
        options: config,
      },
    ],
  }
})
