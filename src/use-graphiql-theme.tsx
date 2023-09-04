import * as React from 'react'

export function useGraphiQLTheme() {
  const [theme, setTheme] = React.useState(getTheme)
  React.useEffect(function () {
    setTheme(getTheme())
    const observer = new MutationObserver(function () {
      setTheme(getTheme())
    })
    observer.observe(document.body, {
      attributes: true,
      subtree: false,
      childList: false,
    })
    return () => observer.disconnect()
  }, [])

  return theme
}

function getTheme(): 'dark' | 'light' {
  return Array.from(document.body.classList.values()).includes('graphiql-dark') ? 'dark' : 'light'
}
