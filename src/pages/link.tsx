import { faThumbTack } from "@fortawesome/free-solid-svg-icons"

import { faInstagram, faItunes, faSoundcloud, faSpotify, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"
import '../styles/link.css'

import Moment from "react-moment"


import ReactTimeAgo from "react-time-ago"

import MetaTags from "../components/MetaTags"
import LoadingLatestTrack from "../components/LoadingLatestTrack"
import LoadingPinned from "../components/LoadingPinned"


// markup
const IndexPage = () => {

  const [isTrackListReady, setIsTrackListReady] = React.useState(false);
  const [trackList, setTrackList] = React.useState([]);
  const [isPinnedReady, setIsPinnedReady] = React.useState(false);
  const [pinnedList, setPinnedList] = React.useState([]);

  const [showedTrack, setShowedTrack] = React.useState(2)
  const ref = React.useRef(null)

  const apiEndpoint = process.env.API_ENDPOINT;

  /**
 * Tracklist
 */
  function loadTracklist() {
    const endpoint = apiEndpoint + '/api_tracklist.php?show_hidden'
    fetch(endpoint, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTrackList(data.data)
        setIsTrackListReady(true);
      })
      .catch(error => {
        // TODO: Log
        // Log('error', 'Failed while sending post data', {
        //     endpoint: apiEndpoint,
        //     error: error
        // })
      })
  }


  /**
 * Pinned
 */
  function loadPinned() {
    const endpoint = apiEndpoint + '/api_tracklist.php?show_pinned_only'
    fetch(endpoint, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPinnedList(data.data)
        setIsPinnedReady(true)
      })
      .catch(error => {
        // TODO: Log
        // Log('error', 'Failed while sending post data', {
        //     endpoint: apiEndpoint,
        //     error: error
        // })
      })
  }






  React.useEffect(() => {
    loadTracklist()
    loadPinned()
  }, [])

  function showMoreTrack() {
    setShowedTrack(showedTrack + 2);
  }

  return (
    <>
      <MetaTags metaTitle="Clay Machine - Links" />

      <div className="container link
      ">
        <div className="profile">
          <div className="avatar">
            <img src="https://pbs.twimg.com/profile_images/1320794080020893697/uPw58liY_400x400.jpg" />
          </div>
          <h1 className="">@claymachine</h1>
          <p className="bio"></p>
        </div>


        <h2 className="title">Pinned <FontAwesomeIcon icon={faThumbTack} /></h2>
        <div className="pinned">
        {
          isPinnedReady ? (
            <>
            
          {
            pinnedList.map((item: any, index: any) => {
              return (<>

                {
                  (item.release_date - (new Date().getTime() / 1000)) < 1 ? (
                    <>
                      <a href={item.link}>
                        <div className="content-link">
                          <h3>Stream "{item.title}" now</h3>
                          <p>Latest tunes from <b>{
                            item.artist.length > 1 ? (
                              <>
                                {item.artist.join(', ')}
                              </>
                            ) : (
                              <>{item.artist[0]}</>
                            )
                          }</b></p>
                        </div>
                        <div className="shade"></div>
                        <img className="content-banner" src={item.front_artwork_sd} />
                      </a>
                    </>
                  ) : null
                }


              </>)
            })
          }
            </>
          ) : (
              <LoadingPinned />
          )
        }
        </div>

        <h2 className="title">Latest Music</h2>

        {
          isTrackListReady ? (
            <div className="latest-music">
              <>
                {
                  trackList.slice(0, showedTrack).map((item: any, index: any) => {
                    return (<>
                      <a href={(item.release_date - (new Date().getTime() / 1000) < 1 ? item.link : null)}
                        className="items"
                        key={item.index}
                      >
                        {
                          (item.release_date - (new Date().getTime() / 1000)) < 1 ? null : (
                            <>
                              <div className="release-eta">
                                Released <ReactTimeAgo future date={new Date(item.release_date * 1000)} /></div>
                            </>
                          )
                        }
                        <div className="album-art">
                          <img src={item.front_artwork_sd} />
                        </div>
                        <div className="content-link">
                          <h3>{item.title}</h3>
                          <p>{
                            item.artist.length > 1 ? (
                              <>
                                {item.artist.join(', ')}
                              </>
                            ) : (
                              <>{item.artist[0]}</>
                            )
                          } · {item.type} · (<Moment unix format="YYYY">{item.release_date}</Moment>)</p>
                        </div>
                      </a>
                    </>)
                  })
                }
                {
                  trackList.length > showedTrack && (
                    <a className="see-more" onClick={() => showMoreTrack()}>see more</a>
                  )
                }
              </>
            </div>
          ) : (

            <div className="latest-music">
              <LoadingLatestTrack />
            </div>
          )
        }


        <h2 className="title">Find Me</h2>
        <div className="find-me">
          <ul className="nav flex-column mb-0">
            <li className="nav-item">
              <a className="tooltip2" target="_blank" href="/youtube/">
                <FontAwesomeIcon icon={faYoutube} />
                <span className="tooltiptext">YouTube Channel</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="https://open.spotify.com/artist/48tjWkLVu14ivc5z58cdx4" className="tooltip2">
                <FontAwesomeIcon icon={faSpotify} />
                <span className="tooltiptext">Spotify - Clay Machine</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="https://open.spotify.com/artist/65xJyuOQbsXntwij7CkFIG?si=c6iILUBGTEKG3S-9zQYceQ"
                className="tooltip2">
                <FontAwesomeIcon icon={faSpotify} />
                <span className="tooltiptext">Spotify - MALEVOLENT</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="tooltip2" target="_blank" href="https://soundcloud.com/claymachine">
                <FontAwesomeIcon icon={faSoundcloud} />
                <span className="tooltiptext">Soundcloud</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="tooltip2" target="_blank" href="https://music.apple.com/us/artist/clay-machine/1457129710">
                <FontAwesomeIcon icon={faItunes} />
                <span className="tooltiptext">Apple iTunes</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="tooltip2" target="_blank" href="https://www.instagram.com/claymachine/">
                <FontAwesomeIcon icon={faInstagram} />
                <span className="tooltiptext">Instagram</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="tooltip2" target="_blank" href="https://twitter.com/claymachine">
                <FontAwesomeIcon icon={faTwitter} />
                <span className="tooltiptext">Twitter</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="tooltip2" target="_blank" href="https://tiktok.com/@claymachine">
                <FontAwesomeIcon icon={faTiktok} />
                <span className="tooltiptext">TikTok</span>
              </a>
            </li>
          </ul>
        </div>


      </div>

    </>
  )
}

export default IndexPage
