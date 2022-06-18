import * as React from "react"

const SpotifyShortcut = () => {
  if (typeof window === 'undefined') {
    return;
  }
    React.useEffect(() => {
        window.location.replace(process.env.SOCIAL_SPOTIFY);
    })
  return (
    <>
        Redirecting...
    </>
  )
}

export default SpotifyShortcut
