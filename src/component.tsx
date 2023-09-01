import * as React from 'react'

import {Tool} from 'sanity'

import 'graphiql/graphiql.css'
import './custom.css'

import {GraphiQLToolConfig} from './types'
import {Header} from './header'
import {useListGraphQLApis} from './use-list-graphql-apis'
import {GraphiQL} from './graphiql'

type GraphiQLToolProps = {
  tool: Tool<GraphiQLToolConfig>
}

export default function GraphiQLTool(props: GraphiQLToolProps) {
  const {version} = props.tool.options!

  const apis = useListGraphQLApis(version)
  const [url, setUrl] = React.useState<string | null>(null)

  return (
    <div className='graphiql-tool-wrapper'>
      <Header url={url} onUrlChange={setUrl} apis={apis} />
      <GraphiQL url={url} />
    </div>
  )
}
