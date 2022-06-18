

import {  faInstagram, faItunesNote, faSoundcloud, faSpotify, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"
import '../styles/main.css'
import slashLogoW from '../images/slash_w.svg';
import textLogoW from '../images/text_w.svg';
import slashLogoB from '../images/slash_b.svg';
import textLogoB from '../images/text_b.svg';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Moment from "react-moment"

import ReactTimeAgo from "react-time-ago"


import MetaTags from "../components/MetaTags"

import { EffectCoverflow } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";



// markup
const IndexPage = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const [trackList, setTrackList] = React.useState([]);
  const [selectedTrack, setSelectedTrack] = React.useState(0);
  const [isAlbumArtFlipped, setIsAlbumArtFlipped] = React.useState(false);
  const [albumArtClass, setAlbumArtClass] = React.useState(['card']);

  const [albumArtHeight, setAlbumArtHeight] = React.useState(440)
  const [albumArtWidth, setAlbumArtWidth] = React.useState(440)
  const [trackPerPage, setTrackPerPage] = React.useState(1)
  const [activeSlide, setActiveSlide] = React.useState(0)

  const [slideFlippedState, setSlideFlippedState] = React.useState([])
  const [slideFlippedClass, setSlideFlippedClass] = React.useState([])
  const ref = React.useRef(null)

  const apiEndpoint = process.env.API_ENDPOINT;

  /**
 * Load tipper on page load 
 */
  function loadTracklist() {
    const endpoint = apiEndpoint + '/api_tracklist.php'
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

        let items = [];
        let itemsClass = [];
        data.data.map(() => {
          items.push(false)
          itemsClass.push(['card'])
        })
        setSlideFlippedState(items)
        setSlideFlippedClass(itemsClass)
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


  /**
   * Detect window size
   */
  React.useEffect(() => {
    if (ref.current != null) {
      setAlbumArtHeight(ref.current.clientWidth)
      setAlbumArtWidth(ref.current.clientWidth)
    }
  })

  const [dimension, setDimension] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);


  /**
   * Detect window's size changes 
   */
  React.useLayoutEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      if (ref.current != null) {
        setAlbumArtHeight(ref.current.clientWidth)
        setAlbumArtWidth(ref.current.clientWidth)
      }

      setDimension([window.innerWidth, window.innerHeight]);
    }, 100); // 100ms
    window.addEventListener('resize', debouncedResizeHandler);
    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, [])

  function debounce(fn, ms) {
    let timer;
    return _ => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  function onSwiperChange(currectSwiper: any) {
    console.log('active slide: ' +  currectSwiper.activeIndex);
    setActiveSlide(currectSwiper.activeIndex);
  }

  function flipAlbumArt(realIndex: any) {
    /**
     * Avoid action if the current index not slected
     */
    if (realIndex !== activeSlide) {
      return true;
    }

    /**
     * 
     */
    let slideFlippedStateTmp = [...slideFlippedState];
    slideFlippedStateTmp[realIndex] = !slideFlippedStateTmp[realIndex];
    setSlideFlippedState(slideFlippedStateTmp);

    // if (activeSlide === realIndex) {
      let slideFlippedClassTmp = [...slideFlippedClass];
      if (!slideFlippedStateTmp[realIndex]) {
        slideFlippedClassTmp[realIndex].push("card--unflip");
        setSlideFlippedClass(slideFlippedClassTmp)
        setTimeout(function () {
          // remove card-flipped
          var index = slideFlippedClassTmp[realIndex].indexOf("card--flipped");
          if (index !== -1) { slideFlippedClassTmp[realIndex].splice(index, 1); }
  
          // remove card-unflip
          var index = slideFlippedClassTmp[realIndex].indexOf("card--unflip");
          if (index !== -1) { slideFlippedClassTmp[realIndex].splice(index, 1); }
          setSlideFlippedClass(slideFlippedClassTmp)
        }, 700);
      } else {
        slideFlippedClassTmp[realIndex].push("card--flipped");
        setSlideFlippedClass(slideFlippedClassTmp)
      }
  }

  React.useEffect(() => {
    setSlideFlippedState(slideFlippedState)
  }, [slideFlippedState])


  React.useEffect(() => {
    setSlideFlippedClass(slideFlippedClass)
  }, [slideFlippedClass])

  return (
    <>
      <MetaTags />
      <div className="container home">
        <div className="wrapper">
          <div className="section-home">
            <div className="text-logo">
              <img src={textLogoW} alt="CLAY MACHINE" />
            </div>
            <div className="slash-logo">
              <img src={slashLogoW} alt="//" />
            </div>

            <div className="social">
              <a href={process.env.SOCIAL_YOUTUBE} target="_blank">
                <FontAwesomeIcon icon={faYoutube} />
                <span>
                  <strong>Youtube</strong><br />
                  Stream
                </span>
              </a>
              <a href={process.env.SOCIAL_APPLE} target="_blank">
                <FontAwesomeIcon icon={faItunesNote} />
                <span>
                  <strong>Apple Music</strong><br />
                  Stream
                </span>
              </a>
              <a href={process.env.SOCIAL_SPOTIFY} target="_blank">
                <FontAwesomeIcon icon={faSpotify} />
                <span>
                  <strong>Spotify</strong><br />
                  Stream
                </span>
              </a>
              <a href={process.env.SOCIAL_SOUNDCLOUD} target="_blank">
                <FontAwesomeIcon icon={faSoundcloud} />
                <span>
                  <strong>Soundcloud</strong><br />
                  Stream
                </span>
              </a>
              <a href={process.env.SOCIAL_INSTAGRAM} target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
                <span><strong>Instagram</strong><br />
                  Follow
                </span>
              </a>
              <a href={process.env.SOCIAL_TWITTER} target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
                <span><strong>Twitter</strong><br />
                  Follow
                </span>
              </a>
              <a href={process.env.SOCIAL_TIKTOK} target="_blank">
                <FontAwesomeIcon icon={faTiktok} />
                <span><strong>Tiktok</strong><br />
                  Follow
                </span>
              </a>
            </div>
          </div>
          <div className="section-music">
            <div className="text-logo">
              <img src={textLogoB} alt="CLAY MACHINE" />
            </div>
            <div className="slash-logo">
              <img src={slashLogoB} alt="//" />
            </div>
            <div className="listen">
              <Swiper
                onSlideChange={(currentSwiper) => { onSwiperChange(currentSwiper) }}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 10,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true
                }}
                grabCursor={true}
                modules={[EffectCoverflow]}

                centeredSlides={true}
                breakpoints={{
                  500: {
                    slidesPerView: 1,
                    spaceBetween: 100
                  },
                  700: {
                    slidesPerView: 3,
                    spaceBetween: 0
                  },
                  900: {
                    slidesPerView: 5,
                    spaceBetween: 0
                  }
                }}

              >
                {
                  trackList.map((item: any, index: any) => {
                    return (
                      <SwiperSlide key={item.id}>

                        <div className="album-art"
                          ref={ref}
                          onClick={() => {
                            if (item.back_artwork !== null) {
                              flipAlbumArt(index);
                            }
                          }}
                          style={{ height: albumArtHeight }}
                        >
                          <div id="card" className={slideFlippedClass[index].join(' ')}>
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
                        </div>
                      </SwiperSlide>
                    )

                  })
                }
              </Swiper>


              {
                trackList.map((item: any, index: any) => {
                  return (

                    <div className={index == activeSlide ? 'song-basic-info' : 'song-basic-info hide'}>
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
                        <span className="album">{item.type} (<Moment unix format="YYYY">{item.release_date}</Moment>)</span>
                      </div>
                      {
                        (item.release_date - (new Date().getTime() / 1000)) < 1 ? (
                          <>

                            <a href={item.link}>
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
                  )
                })
              }
            </div>
          </div>

          <footer className="footer">
              P &amp; C 2020 Clay Machine | Some Rights reserved, contact us for creative uses. Thank you for listening.
            </footer>
        </div>
      </div>

      <div className="swiper-pagination"></div>
    </>
  )
}

export default IndexPage
