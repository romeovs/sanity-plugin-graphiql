t import * as React from 'react'

type Setter<T> = React.Dispatch<React.SetStateAction<T | null>>

export function usePersistedState<T>(key: string): [T | null, Setter<T>]
export function usePersistedState<T>(key: string, initialValue: T): [T, Setter<T>]
export function usePersistedState<T>(key: string, initialValue?: T): [T | null, Setter<T>] {
  const init = read<T>(key) ?? initialValue ?? null
  const [value, setValue] = React.useState<T | null>(init)

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
