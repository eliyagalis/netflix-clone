import React from 'react'
import { Helmet } from 'react-helmet'

type HelmetHandlerProps = {
    page: HelmetModel;
}

type HelmetModel = {
    title?: string;
    keywords?: string;
    description?: string;
    image?: string;
}

const HelmetHandler:React.FC<HelmetHandlerProps> = ({ page }) => {
    return (
        <Helmet>
            <title>{page?.title}</title>
            <meta name="keywords" content={page?.keywords} />
            <meta property="og:title" content={page?.title} />
            <meta property="og:description" content={page?.description} />
            <meta property="og:image" content={page?.image || "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png"} />
            <meta name="robots" content="index, follow" />
        </Helmet>
    )
}

export default HelmetHandler