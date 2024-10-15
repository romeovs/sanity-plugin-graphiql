import {useMemo} from 'react'

export function useNamespacedStorage(namespace: string) {
  return useMemo(
    function () {
      const prefix = `${namespace}__`
      function prefixed(key: string) {
        return `${prefix}${key}`
      }

      function* keys() {
        for (const key in Object.keys(localStorage)) {
          if (key.startsWith(prefix)) {
            yield key
          }
        }
      }

      return {
        setItem(key: string, value: string) {
          localStorage.setItem(prefixed(key), value)
        },
        getItem(key: string) {
          return localStorage.getItem(prefixed(key))
        },
        removeItem(key: string) {
          return localStorage.removeItem(prefixed(key))
        },
        clear() {
          for (const key of keys()) {
            localStorage.removeItem(key)
          }
        },
        get length() {
          let count = 0
          for (const _ of keys()) {
            count += 1
          }
          return count
        },
      }
    },
    [namespace],
  )
}
