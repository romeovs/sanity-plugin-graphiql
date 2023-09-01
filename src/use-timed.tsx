import * as React from 'react'
import {Fetcher, isAsyncIterable} from '@graphiql/toolkit'

export function useTimedFetcher(fn: Fetcher | null): [Fetcher, number | null] {
  const [elapsed, setElapsed] = React.useState<number | null>(null)
  const wrapped = React.useMemo(
    function () {
      return async function* (...args: Parameters<Fetcher>): ReturnType<Fetcher> {
        if (!fn) {
          return
        }

        const start = Date.now()
        const it = fn!(...args)

        if (it instanceof Promise) {
          yield await it
          return
        }

        if (!it) {
          return
        }

        if (!isAsyncIterable(it)) {
          return it
        }

        for await (const item of it) {
          yield item
        }

        const elapsed = Date.now() - start
        setElapsed(elapsed)
        return
      }
    },
    [fn],
  )

  return [wrapped, elapsed]
}
