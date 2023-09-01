import * as React from 'react'

import {Tool} from 'sanity'

import 'graphiql/graphiql.css'
import './custom.css'

import {GraphiQLToolConfig} from './types'
import {useListGraphQLApis} from './use-list-graphql-apis'
import {Header} from './header'
import {ErrorBoundary} from './error-boundary'
import {ErrorRender} from './error'
import {GraphiQL} from './graphiql'

type GraphiQLToolProps = {
  tool: Tool<GraphiQLToolConfig>
}

export default function GraphiQLTool(props: GraphiQLToolProps) {
  return (
    <ErrorBoundary fallback={(err) => <ErrorRender error={err} />}>
      <Render {...props} />
    </ErrorBoundary>
  )
}

function Render(props: GraphiQLToolProps) {
  const {apiVersion} = props.tool.options!

  const apis = useListGraphQLApis(apiVersion)
  const [url, setUrl] = React.useState<string | null>(null)

  return (
    <div className='graphiql-tool-wrapper'>
      <Header url={url} onUrlChange={setUrl} apis={apis} />
      <GraphiQL url={url} />
    </div>
  )
}
