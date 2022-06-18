import * as React from "react"
import ContentLoader from 'react-content-loader'

const LoadingLatestTrack = (props: any) => {

    return (
        <div style={{marginTop: "20px"}}>
            <ContentLoader viewBox="0 0 500 110">
                <rect x="20" y="0" rx="4" ry="4" width="90" height="90" />
                <rect x="140" y="14" rx="4" ry="4" width="200" height="30" />
                <rect x="140" y="50" rx="4" ry="4" width="120" height="20" />
            </ContentLoader>
            <ContentLoader viewBox="0 0 500 110">
                <rect x="20" y="0" rx="4" ry="4" width="90" height="90" />
                <rect x="140" y="14" rx="4" ry="4" width="250" height="30" />
                <rect x="140" y="50" rx="4" ry="4" width="120" height="20" />
            </ContentLoader>
        </div>
    )
}

export default LoadingLatestTrack