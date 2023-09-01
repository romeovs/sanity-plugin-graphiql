export type UrlInfo = {
  projectId: string
  version: string
  dataset: string
  tag: string
  perspective: string
}

export function parseUrl(url: string | null): UrlInfo {
  if (!url) {
    return {
      projectId: '__',
      version: '__',
      dataset: '__',
      tag: '__',
      perspective: '__',
    }
  }

  const u = new URL(url)
  const perspective = u.searchParams.get('perspective') ?? 'raw'
  const projectId = u.hostname.split('.')[0]
  const [_, version, __, dataset, tag] = u.pathname.split('/')

  if (!perspective || !projectId || !version || !dataset || !tag) {
    throw new Error('Could not parse url')
  }

  return {
    projectId,
    version,
    dataset,
    tag,
    perspective: version === 'v1' ? 'raw' : perspective,
  }
}

export function buildUrl(info: UrlInfo): string {
  const p = info.version === 'v1' ? 'raw' : info.perspective
  return `https://${info.projectId}.api.sanity.io/${info.version}/graphql/${info.dataset}/${info.tag}?perspective=${p}`
}
