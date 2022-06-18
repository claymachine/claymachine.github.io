import * as React from "react"
import ContentLoader from 'react-content-loader'

const LoadingPinned = (props: any) => {

    return (
        <div style={{marginTop: "20px"}} className="pinned-loading">
            <ContentLoader viewBox="0 0 500 110" foregroundColor="#111" backgroundColor="rgb(37, 37, 37)">
                <rect x="20" y="14" rx="4" ry="4" width="400" height="30" />
                <rect x="20" y="50" rx="4" ry="4" width="120" height="20" />
            </ContentLoader>
        </div>
    )
}

export default LoadingPinned