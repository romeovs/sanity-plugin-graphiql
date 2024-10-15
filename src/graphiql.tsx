import {GraphiQL as Component, GraphiQLProps as ComponentProps} from 'graphiql'

import {useFetcher} from './use-fetcher'
import {useTimedFetcher} from './use-timed'

type GraphiQLProps = {
  url: string | null
  defaultQuery?: string
  storage: ComponentProps['storage']
}

export function GraphiQL(props: GraphiQLProps) {
  const {url, storage} = props
  const _fetcher = useFetcher(url)
  const [fetcher, elapsed] = useTimedFetcher(_fetcher)

  if (!fetcher) {
    return null
  }

  return (
    <Component fetcher={fetcher} defaultQuery={''} storage={storage}>
      <Component.Footer>
        <div className='graphiql-footer-elapsed'>
          End-to-end: {elapsed ? `${elapsed}ms` : 'n/a'}
        </div>
      </Component.Footer>
    </Component>
  )
}
