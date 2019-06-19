import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"
import PropTypes from "prop-types"

function createBreadcrumb(name, pathname) {
  return `${name}${pathname
    .split("/")
    .map(
      crumb =>
        `${crumb
          .replace("-", " ")
          .replace(/(^|\s)\S/g, letter => letter.toUpperCase())}`
    )
    .join(" > ")}`
}

const Head = (
  {
    author,
    title,
    description,
    keywords,
    banner,
    pathname,
    article,
    qa,
    social
  },
  ...props
) => {
  const query = useStaticQuery(graphql`
    query HeadQuery {
      site {
        buildTime(formatString: "YYYY-MM-DD")
      }
    }
  `)

  const {
    site: { buildTime }
  } = query

  if (!pathname) {
    if (props.location && props.location.pathname) {
      pathname = props.location.pathname
    } else if (global.location && global.location.pathname) {
      pathname = global.location.pathname
    } else {
      pathname = "/"
    }
  }

  if (pathname.includes(".html")) {
    pathname = pathname.split(".")[0]
  }

  const breadcrumb = createBreadcrumb(`jg`, pathname)

  let keywordList = ["JG Template", "GatsbyJS", "Frontend Development"]
  if (keywords && keywords.length > 0) {
    keywordList = [...keywordList, ...keywords]
  }

  const onChangeClientState = (newState, addedTags, removedTags) =>
    process.env.NODE_ENV === "development" &&
    console.log(buildTime, newState, addedTags, removedTags)

  const seo = {
    title,
    description,
    keywords: keywordList,
    image: banner,
    author,
    url: pathname
  }

  let contentType = "website"
  if (article) {
    contentType = "article"
  }

  return (
    <Helmet
      defer={false}
      onChangeClientState={onChangeClientState}
      titleTemplate={`JG Template`}
    >
      <html lang={"en"} />
      <title itemProp="name" lang={"en"}>
        {seo.title}
      </title>

      {/* Standard */}
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <link rel="canonical" href="https://getroute.com/" />
      <link rel="home" href="https://getroute.com/" />
      {/* <link rel="next" href="https://getroute.com/"> */}
      <link rel="image_src" type="image/png" href={seo.image} />
      <link
        rel="publisher"
        href="https://aboutme.google.com/u/4/b/102515604434712780742/"
      />
      {/* <link
        rel="search"
        type="application/opensearchdescription+xml"
        href="https://getroute.com/opensearch?locale=en_US"
        title="Route"
      /> */}

      {/* General */}
      <meta name="author" content={seo.author} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="image" content={seo.image} />
      <meta property="image:width" content="1024" />
      <meta property="image:height" content="512" />
      <meta name="application-name" content={`JG Template`} />
      <meta name="msapplication-TileColor" content={`#0a0a0a`} />
      <meta name="msapplication-config" content="none" />
      <meta name="apple-mobile-web-app-title" content={`JG Template`} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* OpenGraph  */}
      <meta property="fb:app_id" content={process.env.GATSBY_FACEBOOK_APP_ID} />
      <meta property="og:site_name" content={`JG Template`} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={contentType} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:secure_url" content={seo.image} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:site" content={social} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={social} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:text:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:height" content="512" />
      <meta name="twitter:image:width" content="1024" />
      <meta name="twitter:app:id:iphone" content="PLACEHOLDER" />
      <meta name="twitter:app:id:ipad" content="PLACEHOLDER" />
      <meta name="twitter:app:id:googleplay" content="com.rozaroute" />
    </Helmet>
  )
}

Head.propTypes = {
  article: PropTypes.bool,
  banner: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.string,
  title: PropTypes.string,
  qa: PropTypes.bool,
  /* PLACEHOLDER --- MIGHT MOVE TO SOMEWHERE ELSE OTHER THAN A PROP */
  author: PropTypes.string,
  shortName: PropTypes.string,
  social: PropTypes.string
}

Head.defaultProps = {
  article: false,
  banner: null,
  description: "JG Template: About Frontend Development",
  keywords: ["gatsby, template, frontend"],
  pathname: null,
  title: "JG Template: About Frontend Development",
  qa: false,
  /* PLACEHOLDER --- MIGHT MOVE TO SOMEWHERE ELSE OTHER THAN A PROP */
  author: "JG",
  shortName: "JG Template",
  social: "@mrgrotts"
}

export default Head

const Corporation = {
  "@context": "http://schema.org",
  "@type": "Corporation",
  name: "Stripe",
  url: "https://stripe.com/",
  logo: "https://stripe.com/img/about/logos/logos/blue.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      url: "https://stripe.com/contact",
      email: "info@stripe.com",
      contactType: "customer support"
    }
  ],
  sameAs: [
    "https://www.facebook.com/StripeHQ/",
    "https://twitter.com/stripe",
    "https://www.linkedin.com/company/stripe"
  ]
}

const Country = {
  "@context": "http://schema.org",
  "@type": "Country",
  address: {
    addressCountry: "US"
  }
}

const Organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://getroute.com/#organization",
      name: "Route: The Service Platform",
      url: "https://getroute.com/",
      sameAs: [
        "http://www.facebook.com/route_platform",
        "http://instagram.com/route_platform",
        "http://www.linkedin.com/in/route_platform",
        "http://twitter.com/route_platform",
        "https://www.youtube.com/channel/UCotpo-oU-62ykPzT4-R_UQQ"
      ],
      logo:
        "https://cloud.google.com/_static/images/cloud/icons/favicons/onecloud/super_cloud.png",
      brand: "Route",
      parentOrganization: "Roza Route",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://cloud.google.com/s/results?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://getroute.com/#website",
      url: "https://getroute.com/",
      name: "Route",
      publisher: { "@id": "https://getroute.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://getroute.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://getroute.com/#webpage",
      url: "https://getroute.com/",
      inLanguage: "en-US",
      name: "Route: The Service Platform",
      isPartOf: { "@id": "https://getroute.com/#website" },
      about: { "@id": "https://getroute.com/#organization" },
      datePublished: "2018-10-17T02:22:11+00:00",
      dateModified: "2019-06-07T21:07:51+00:00",
      description: "Route the service platform yo"
    }
  ]
}
