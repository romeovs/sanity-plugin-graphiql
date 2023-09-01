import * as React from 'react'
import {Stack, Flex, Card, Text, Code} from '@sanity/ui'

type Props = {
  error: Error
}

export function ErrorRender(props: Props) {
  const {error} = props

  return (
    <Flex align='center' direction='column' gap={3} height='fill' justify='center'>
      <Stack>
        <Card radius={1} padding={4} shadow={1} tone='critical'>
          <Text muted>Failed to fetch available GraphQL API's for this workspace.</Text>
          {error?.message && (
            <>
              <br />
              <Card radius={1} padding={4} shadow={1} tone='critical'>
                <Code>{error.message}</Code>
              </Card>
            </>
          )}
        </Card>
      </Stack>
    </Flex>
  )
}
