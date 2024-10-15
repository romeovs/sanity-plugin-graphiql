import {Tool, useProjectId} from 'sanity'

import 'graphiql/graphiql.css'
import './custom.css'

import {GraphiQLToolConfig} from './types'
import {useListGraphQLApis} from './use-list-graphql-apis'
import {usePersistedState} from './use-persisted-state'
import {Header} from './header'
import {ErrorBoundary} from './error-boundary'
import {ErrorRender, ErrorMessage} from './error'
import {GraphiQL} from './graphiql'

type GraphiQLToolProps = {
  tool: Tool<GraphiQLToolConfig>
}

type State = {
  url: string | null
}

export default function GraphiQLTool(props: GraphiQLToolProps) {
  return (
    <ErrorBoundary fallback={(err) => <ErrorRender error={err} />}>
      <Render {...props} />
    </ErrorBoundary>
  )
}

function Render(props: GraphiQLToolProps) {
  const options = props.tool.options!
  const {apiVersion} = options

  const projectId = useProjectId()
  const key = `graphiql_tool__${projectId}`

  const apis = useListGraphQLApis(apiVersion)
  const [state, setState] = usePersistedState<State>(key, {
    url: options.url ?? null,
  })

  const {url} = state
  function setUrl(url: string) {
    setState((state) => ({
      ...state,
      url,
    }))
  }

  if (apis.data?.length === 0) {
    return (
      <ErrorMessage message="There are no GraphQL API's defined for this project, please add some before attempting to use this tool." />
    )
  }

  return (
    <div className='graphiql-tool-wrapper'>
      {options.url ? null : <Header url={url} onUrlChange={setUrl} apis={apis} />}
      <div className='graphiql-container'>
        <GraphiQL url={url} defaultQuery={options.defaultQuery} />
      </div>
    </div>
  )
}
