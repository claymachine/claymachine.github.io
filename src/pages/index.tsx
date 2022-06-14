import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"

import { fab, faInstagram, faItunesNote, faSoundcloud, faSpotify, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"
import '../styles/main.css'
import slashLogo from '../images/slash_logo.png';
import textLogo from '../images/text_logo.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Moment from "react-moment"
import Countdown from "react-countdown"

import ReactTimeAgo from "react-time-ago"
import en from 'javascript-time-ago/locale/en.json'
import TimeAgo from 'javascript-time-ago'
import MetaTags from "../components/MetaTags"


TimeAgo.addDefaultLocale(en)


// markup
const IndexPage = () => {

  const [trackList, setTrackList] = React.useState([]);
  const [selectedTrack, setSelectedTrack] = React.useState(0);
  const [isAlbumArtFlipped, setIsAlbumArtFlipped] = React.useState(false);
  const [albumArtClass, setAlbumArtClass] = React.useState(['card']);

  const apiEndpoint = process.env.API_ENDPOINT;

  /**
 * Load tipper on page load 
 */
  function loadTracklist() {
    const endpoint = apiEndpoint + '/tracklist.json'
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
  }, [])

  function onSwiperChange() {
    setIsAlbumArtFlipped(false)
    flipAlbumArt();
  }

  function flipAlbumArt() {
    if (isAlbumArtFlipped) {
      albumArtClass.push("card--unflip");
      setTimeout(function () {
        // remove card-flipped
        var index = albumArtClass.indexOf("card--flipped");
        if (index !== -1) { albumArtClass.splice(index, 1); }

        // remove card-unflip
        var index = albumArtClass.indexOf("card--unflip");
        if (index !== -1) { albumArtClass.splice(index, 1); }
      }, 500);
    } else {
      albumArtClass.push("card--flipped");
    }
  }

  return (
    <>
      <MetaTags/>
      <div className="container">
        <div className="wrapper">
          <div className="section-home">
            <div className="text-logo">
              <img src={textLogo} alt="CLAY MACHINE" />
            </div>
            <div className="slash-logo">
              <img src={slashLogo} alt="//" />
            </div>

            <div className="social">
              <a href="https://claymachine.github.io/youtube/" target="_blank">
                <FontAwesomeIcon icon={faYoutube} />
                <span>
                  <strong>Youtube</strong><br />
                  Stream
                </span>
              </a>
              <a href="https://music.apple.com/us/artist/clay-machine/1457129710" target="_blank">
                <FontAwesomeIcon icon={faItunesNote} />
                <span>
                  <strong>Apple Music</strong><br />
                  Stream
                </span>
              </a>
              <a href="https://open.spotify.com/artist/48tjWkLVu14ivc5z58cdx4" target="_blank">
                <FontAwesomeIcon icon={faSpotify} />
                <span>
                  <strong>Spotify</strong><br />
                  Stream
                </span>
              </a>
              <a href="https://soundcloud.com/claymachine" target="_blank">
                <FontAwesomeIcon icon={faSoundcloud} />
                <span>
                  <strong>Soundcloud</strong><br />
                  Stream
                </span>
              </a>
              <a href="https://www.instagram.com/claymachine/" target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
                <span><strong>Instagram</strong><br />
                  Follow
                </span>
              </a>
              <a href="https://twitter.com/claymachine" target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
                <span><strong>Twitter</strong><br />
                  Follow
                </span>
              </a>
              <a href="https://www.tiktok.com/@claymachine" target="_blank">
                <FontAwesomeIcon icon={faTiktok} />
                <span><strong>Tiktok</strong><br />
                  Follow
                </span>
              </a>
            </div>
          </div>
          <div className="section-music">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              onSliderMove={() => { onSwiperChange() }}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {
                trackList.map((item: any) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div className="listen">
                        <a>

                          <div className="album-art"
                            onClick={() => {
                              if (item.release_date - (new Date().getTime() / 1000) < 1) {
                                setIsAlbumArtFlipped(!isAlbumArtFlipped);
                                flipAlbumArt();
                              }
                            }}
                          >
                            <div id="card" className={albumArtClass.join(' ')}>
                              <div className="card-face card-backing">
                                <img
                                  src={item.front_artwork}
                                  alt={'Front side album art of ' + item.title} />
                              </div>
                              <div className="card-face card-front">
                                <img
                                  src={item.back_artwork}
                                  alt={'Front side album art of ' + item.title} />
                              </div>
                            </div>


                            <div className={(isAlbumArtFlipped ? 'song-detail-info' : 'song-detail-info hide')}>
                              <div className="commentary ">
                                <span>About this Song :</span>
                                <p
                                  dangerouslySetInnerHTML={{ __html: item.about.replaceAll(/\n/ig, "<br/>") }}
                                >

                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="song-basic-info">
                            <div className="song-title">{item.title}</div>
                            <div className="artist-album">
                              <span className="artist">
                                {
                                  item.artist.length > 1 ? (
                                    <>
                                      {item.artist.join(', ')}
                                    </>
                                  ) : (
                                    <>{item.artist[0]}</>
                                  )
                                }

                              </span>
                              <span className="dot"></span>
                              <span className="album">Single (<Moment unix format="YYYY">{item.release_date}</Moment>)</span>
                            </div>
                            {
                              (item.release_date - (new Date().getTime() / 1000)) < 1 ? (
                                <>

                                  <a href="https://li.sten.to/claymachine-seewhat">
                                    <div className="button-container-2">
                                      <span className="mas">Listen</span>
                                      <button type="button" name="Hover">Listen</button>
                                    </div>
                                  </a>
                                </>
                              ) : (
                                <>
                                  <div className="button-container-2 coming-soon">
                                    <button type="button" name="Hover">Released <ReactTimeAgo future date={new Date(item.release_date * 1000)} />
                                    </button>
                                  </div>

                                </>
                              )
                            }
                          </div>



                        </a>
                      </div>
                      <div className="track">
                        <div className="title">

                          &nbsp;-&nbsp;{item.title}
                        </div>

                        <div className="type">
                          {item.type}
                        </div>
                        <div className="release-date">
                          {item.release_date}
                        </div>
                      </div>
                    </SwiperSlide>

                  )

                })
              }
            </Swiper>

            <footer className="footer">
              P &amp; C 2020 Clay Machine | Some Rights reserved, contact us for creative uses. Thank you for listening.
            </footer>
          </div>
        </div>
      </div>

    </>
  )
}

export default IndexPage
