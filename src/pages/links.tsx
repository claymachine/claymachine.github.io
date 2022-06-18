import * as React from "react"

const LinksShortcut = () => {
  if (typeof window === 'undefined') {
    return;
  }
    React.useEffect(() => {
        window.location.replace('/link');
    })
  return (
    <>
        Redirecting...
    </>
  )
}

export default LinksShortcut
