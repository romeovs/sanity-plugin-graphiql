import {useProjectId} from 'sanity'

/**
 * useToken finds the Sanity token that was stored in localStorage.
 */
export function useToken(): string | null {
  // TODO: is there an official sanity api we can lean on here?

  const projectId = useProjectId()

  const key = `__studio_auth_token_${projectId}`

  const data = localStorage.getItem(key)
  if (!data) {
    return null
  }

  try {
    const value = JSON.parse(data)
    return value.token
  } catch {
    return null
  }
}
