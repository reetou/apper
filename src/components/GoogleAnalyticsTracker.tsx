import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

export default function GoogleAnalyticsTracker() {
  useEffect(() => {
    console.log(`Google analytics tracker page`, window.location.pathname)
    ReactGA.pageview(window.location.pathname);
  }, [])
  return null
}