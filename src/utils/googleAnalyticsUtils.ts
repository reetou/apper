import ReactGA, { EventArgs } from 'react-ga'

export function trackAnalyticsEvent(args: EventArgs) {
  ReactGA.event(args)
}