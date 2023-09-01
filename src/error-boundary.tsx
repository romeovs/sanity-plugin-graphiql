import * as React from 'react'

type Props = {
  fallback: (err: Error) => React.ReactNode
  children: React.ReactNode
}

type State = {
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {error: null}
  }

  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {fallback, children} = this.props
    const {error} = this.state

    if (error) {
      return fallback(error)
    }

    return children
  }
}
