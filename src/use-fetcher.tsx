import * as React from 'react'
import {createGraphiQLFetcher} from '@graphiql/toolkit'

import {useToken} from './use-token'

export function useFetcher(url: string) {
  const token = useToken()

  return React.useMemo(
    function () {
      if (!token) {
        return null
      }

      return createGraphiQLFetcher({
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    [url, token],
  )
}
