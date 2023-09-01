import * as React from 'react'
import {useClient} from 'sanity'

export type GraphQLApiInfo = {
  projectId: string
  dataset: string
  tag: string
  generation: string
  playgroundEnabled: boolean
}

export type ListGraphQLApisResult = {
  loading: boolean
  error: Error | null
  data: GraphQLApiInfo[] | null
}

export function useListGraphQLApis(apiVersion: string) {
  const client = useClient({apiVersion})

  const [apis, setApis] = React.useState<ListGraphQLApisResult>({
    loading: true,
    data: null,
    error: null,
  })

  React.useEffect(function () {
    client
      .request({url: '/apis/graphql', method: 'GET'})
      .then((res) =>
        setApis({
          loading: false,
          data: res,
          error: null,
        }),
      )
      .catch((err) =>
        setApis({
          loading: false,
          data: null,
          error: err,
        }),
      )
  }, [])

  return apis
}
