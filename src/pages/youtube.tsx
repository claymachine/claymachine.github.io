import * as React from "react"

const YoutubeShortcut = () => {
  if (typeof window === 'undefined') {
    return;
  }
    React.useEffect(() => {
        window.location.replace(process.env.SOCIAL_YOUTUBE);
    })
  return (
    <>
        Redirecting...
    </>
  )
}

export default YoutubeShortcut
