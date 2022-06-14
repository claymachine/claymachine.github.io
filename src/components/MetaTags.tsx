import * as React from "react"
import { Helmet } from "react-helmet"
import defaultImage from '../images/meta.jpg';

export default function MetaTags({
  metaTitle,
  metaDesc,
  metaPreview,
  metaPath
}: any) {
    const defTitle = 'Clay Machine';
    const defDesc = '//';
    const domain = process.env.URL_DOMAIN;

    return (
        <>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>{metaTitle || defTitle}</title>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:description" content={metaDesc || defDesc}/>
            <meta name="twitter:image" content={domain + (metaPreview != undefined ? metaPreview : defaultImage)}/>
            <meta name="twitter:title" content={metaTitle || defTitle}/>
            <meta name="twitter:site" content="@roaringstars"/>
            <meta name="twitter:creator" content="@roaringstars"/>
            <meta property="twitter:domain" content={domain}/>
            <meta property="twitter:url" content={domain + (metaPath != undefined ? metaPath : '/')}/>

            <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
            <meta property="og:locale" content="id_ID" />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content={defTitle} />

            <link rel="canonical" href={domain + (metaPath != undefined ? metaPath : '/')} />
            <meta name="description" content={metaDesc || defDesc}/>
            <meta property="og:url" content={domain + (metaPath != undefined ? metaPath : '/')}/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={metaTitle || defTitle}/>
            <meta property="og:description" content={metaDesc || defDesc}/>
            <meta property="og:image" content={domain + (metaPreview != undefined ? metaPreview : defaultImage)}/>
            <meta property="og:image:secure_url" content={domain + (metaPreview != undefined ? metaPreview : defaultImage)}/>
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </Helmet>
        </>
    )
}