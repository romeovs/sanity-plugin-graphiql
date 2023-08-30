import * as React from 'react'

import {Tool, useProjectId} from 'sanity'
import {EyeOpenIcon, EyeClosedIcon} from '@sanity/icons'

import {createGraphiQLFetcher} from '@graphiql/toolkit'
import {ToolbarButton} from '@graphiql/react'
import {GraphiQL} from 'graphiql'

import 'graphiql/graphiql.css'
import './custom.css'

import {GraphiQLToolConfig} from './types'
import {useToken} from './use-token'

type GraphiQLToolProps = {
  tool: Tool<GraphiQLToolConfig>
}

export default function GraphiQLTool(props: GraphiQLToolProps) {
  const {version, dataset, tag} = props.tool.options!

  const projectId = useProjectId()
  const [preview, setPreview] = React.useState(false)

  const perspective = preview ? 'previewDrafts' : 'published'
  const url = `https://${projectId}.api.sanity.io/${version}/graphql/${dataset}/${tag}?perspective=${perspective}`

  const fetcher = useFetcher(url)

  if (!fetcher) {
    return null
  }

  function togglePreview() {
    setPreview((value) => !value)
  }

  return (
    <GraphiQL
      key={preview.toString()}
      fetcher={fetcher}
      defaultQuery={''}
      toolbar={{
        additionalContent: [
          <ToolbarButton
            label={preview ? 'Disable preview mode' : 'Enable preview mode'}
            onClick={togglePreview}
          >
            {preview ? (
              <EyeOpenIcon className='custom-icon' />
            ) : (
              <EyeClosedIcon className='custom-icon' />
            )}
          </ToolbarButton>,
        ],
      }}
    />
  )
}

function useFetcher(url: string) {
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
