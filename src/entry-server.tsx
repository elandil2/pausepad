import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import App from './App'
import { routes } from './routes'
import { posts, getTranslations } from './content/posts'
import { SITE_URL } from './config/site'

export { routes, posts, getTranslations, SITE_URL }

export const render = (url: string) => {
  const sheet = new ServerStyleSheet()
  const helmetContext: { helmet?: HelmetServerState } = {}

  try {
    const html = renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StyleSheetManager>,
    )
    const helmet = helmetContext.helmet!
    return {
      html,
      styles: sheet.getStyleTags(),
      head: [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()].join(''),
      htmlAttributes: helmet.htmlAttributes.toString(),
    }
  } finally {
    sheet.seal()
  }
}
