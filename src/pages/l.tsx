
import * as React from "react"
import '../styles/link.css'

import { useLocation } from '@reach/router';


// markup
const LinkShortcut = () => {
    if (typeof window === 'undefined') {
        return;
      }
      
    const location = useLocation();

    const [isRedirectFound, setIsRedirectFound] = React.useState(false);
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




    React.useEffect(() => {
        loadTracklist()
    }, [])



    React.useEffect(() => {
        let slug = location.pathname.replaceAll(/\/l\//ig, '')

        if(isTrackListReady) {
            /**
             * redirct to index if null
             */
            if (slug == '') {
                window.location.replace('/link');
            } else {
                trackList.map((item: any) => {
                    if (item.slug == slug && isTrackListReady) {
                        setIsRedirectFound(true);
                        window.location.replace(item.link);
                    }
                })
            }
        }
    }, [trackList, isTrackListReady])

    return (
        <>
            {
                isTrackListReady ? (
                    <>
                        {
                            isRedirectFound ? (
                                <>
                                    Redirecting...
                                </>
                            ) : (
                                <>404 Not Found { window.location.replace('/')}</>
                            )
                        }
                    </>
                ) : (
                    <>Loading...</>
                )
            }
        </>
    );
}

export default LinkShortcut
