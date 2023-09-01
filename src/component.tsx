import * as React from 'react'

import {Tool} from 'sanity'

import {GraphiQL} from 'graphiql'

import 'graphiql/graphiql.css'
import './custom.css'

import {GraphiQLToolConfig} from './types'
import {useFetcher} from './use-fetcher'
import {useTimedFetcher} from './use-timed'
import {Header} from './header'
import {useListGraphQLApis} from './use-list-graphql-apis'

type GraphiQLToolProps = {
  tool: Tool<GraphiQLToolConfig>
}

export default function GraphiQLTool(props: GraphiQLToolProps) {
  const {version} = props.tool.options!

  const apis = useListGraphQLApis(version)
  const [url, setUrl] = React.useState<string | null>(null)

  const _fetcher = useFetcher(url)
  const [fetcher, elapsed] = useTimedFetcher(_fetcher)

  if (!fetcher) {
    return null
  }

  return (
    <div className='graphiql-tool-wrapper'>
      <Header url={url} onUrlChange={setUrl} apis={apis} />
      <GraphiQL fetcher={fetcher} defaultQuery={''}>
        <GraphiQL.Footer>
          <div className='graphiql-footer-elapsed'>
            End-to-end: ${elapsed ? `${elapsed}ms` : 'n/a'}
          </div>
        </GraphiQL.Footer>
      </GraphiQL>
    </div>
  )
}
