import * as React from 'react'

type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export function usePersistedState<T>(key: string, initialValue: T): [T, Setter<T>] {
  const init = read<T>(key) ?? initialValue
  const [value, setValue] = React.useState<T>(init)

  React.useEffect(
    function () {
      write(key, value)
    },
    [value],
  )

  return [value, setValue]
}

function read<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key)
    if (!item) {
      return null
    }
    return JSON.parse(item)
  } catch (err) {
    window.localStorage.removeItem(key)
    return null
  }
}

function write<T>(key: string, value: T) {
  const item = JSON.stringify(value)
  window.localStorage.setItem(key, item)
}
