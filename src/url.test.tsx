import {test, expect} from 'vitest'
import {parseUrl, buildUrl} from './url'

test('parseUrl should work as expected', function () {
  {
    const res = parseUrl(
      'https://hexx0r.api.sanity.io/v2023-08-01/graphql/production/default?perspective=previewDrafts',
    )
    expect(res).toEqual({
      projectId: 'hexx0r',
      version: 'v2023-08-01',
      dataset: 'production',
      tag: 'default',
      perspective: 'previewDrafts',
    })
  }

  {
    const res = parseUrl('https://foobar.api.sanity.io/v1/graphql/staging/custom?perspective=raw')
    expect(res).toEqual({
      projectId: 'foobar',
      version: 'v1',
      dataset: 'staging',
      tag: 'custom',
      perspective: 'raw',
    })
  }
})

test('parseUrl should for raw perspective on v1 urls', function () {
  const res = parseUrl(
    'https://foobar.api.sanity.io/v1/graphql/staging/custom?perspective=published',
  )
  expect(res).toEqual({
    projectId: 'foobar',
    version: 'v1',
    dataset: 'staging',
    tag: 'custom',
    perspective: 'raw',
  })
})

test('buildUrl should build urls as expected', function () {
  const res = buildUrl({
    projectId: 'foobar',
    version: 'v2023-08-01',
    dataset: 'staging',
    tag: 'custom',
    perspective: 'published',
  })

  expect(res).toBe(
    'https://foobar.api.sanity.io/v2023-08-01/graphql/staging/custom?perspective=published',
  )
})

test('buildUrl should for raw perspective on v1 urls', function () {
  const res = buildUrl({
    projectId: 'foobar',
    version: 'v1',
    dataset: 'staging',
    tag: 'custom',
    perspective: 'published',
  })

  expect(res).toBe('https://foobar.api.sanity.io/v1/graphql/staging/custom?perspective=raw')
})
