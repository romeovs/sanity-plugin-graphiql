import * as React from 'react'

import {Card, Stack, Box, Label, Grid, Select} from '@sanity/ui'

import {ListGraphQLApisResult} from './use-list-graphql-apis'
import {parseUrl, buildUrl} from './url'
import {useGraphiQLTheme} from './use-graphiql-theme'

type HeaderProps = {
  url: string | null
  onUrlChange: (url: string) => void
  apis: ListGraphQLApisResult
}

type APIInfo = {
  projectId: string
  dataset: string
  tag: string
}

const defaultVersion = 'v2023-08-01'
const defaultPerspective = 'raw'

// Convert the selected API to a string that can be set on a <option />
function toValue(info: APIInfo): string {
  return `${info.projectId}:${info.dataset}:${info.tag}`
}

// Parse the value on an <option /> into the related API info
function fromValue(str: string): APIInfo {
  const [projectId, dataset, tag] = str.split(':')
  if (!projectId || !dataset || !tag) {
    throw new Error('Could not parse value')
  }

  return {projectId, dataset, tag}
}

export function Header(props: HeaderProps) {
  const {url, onUrlChange, apis} = props

  const parsed = parseUrl(url)
  const {version, perspective} = parsed

  React.useEffect(
    function () {
      if (!apis.data?.[0] || url) {
        return
      }

      onUrlChange(
        buildUrl({
          ...apis.data[0],
          version: defaultVersion,
          perspective: defaultPerspective,
        }),
      )
    },
    [url, apis.data],
  )

  const theme = useGraphiQLTheme()

  function handleApiChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    onUrlChange(
      buildUrl({
        ...parsed,
        ...fromValue(evt.target.value),
      }),
    )
  }

  function handleVersionChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    onUrlChange(
      buildUrl({
        ...parsed,
        version: evt.target.value,
      }),
    )
  }

  function handlePerspectiveChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    onUrlChange(
      buildUrl({
        ...parsed,
        perspective: evt.target.value,
      }),
    )
  }

  return (
    <Card padding={3} borderBottom>
      <Grid columns={[20, 12, 12]}>
        <Box padding={1} column={3}>
          <Stack space={2}>
            <Label size={1}>GraphQL API</Label>
            <Select
              size={1}
              value={toValue(parsed)}
              onChange={handleApiChange}
              disabled={apis?.loading}
            >
              <option disabled>projectId, dataset, tag</option>
              {apis.data?.map((api: APIInfo) => (
                <option key={toValue(api)} value={toValue(api)}>
                  {api.projectId}, {api.dataset}, {api.tag}
                </option>
              ))}
            </Select>
          </Stack>
        </Box>
        <Box padding={1} column={2}>
          <Stack space={2}>
            <Label size={1}>API Version</Label>
            <Select size={1} value={version} onChange={handleVersionChange} disabled={apis.loading}>
              <option>v2023-08-01</option>
              <option>v1</option>
            </Select>
          </Stack>
        </Box>
        <Box padding={1} column={2}>
          <Stack space={2}>
            <Label size={1}>Perspective</Label>
            <Select
              size={1}
              value={perspective}
              onChange={handlePerspectiveChange}
              disabled={apis.loading || version === 'v1'}
            >
              <option>raw</option>
              <option>previewDrafts</option>
              <option>published</option>
            </Select>
          </Stack>
        </Box>
      </Grid>
    </Card>
  )
}
