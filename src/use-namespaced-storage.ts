import {useMemo} from 'react'
import type {GraphiQLProps} from 'graphiql'
import * as React from 'react'

export type Storage = GraphiQLProps['storage']

type State = {
  store?: {
    [key: string]: string | null
  } | null
}

type Setter<T extends State> = React.Dispatch<React.SetStateAction<T>>

export function useNamespacedStorage<T extends State>(
  state: T | null,
  setState: Setter<T>,
): Storage {
  return useMemo(
    function () {
      return {
        setItem(key: string, value: string) {
          setState((state) => ({
            ...state,
            store: {
              ...state?.store,
              [key]: value,
            },
          }))
        },
        getItem(key: string) {
          return state?.store?.[key] ?? null
        },
        removeItem(key: string) {
          setState((state) => ({
            ...state,
            store: {
              ...state.store,
              [key]: null,
            },
          }))
        },
        clear() {
          setState((state) => ({
            ...state,
            store: {},
          }))
        },
        get length() {
          return Object.keys(state?.store ?? {}).length
        },
      }
    },
    [state, setState],
  )
}
