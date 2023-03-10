import '@/css/tailwind.css'
import '@/css/prism.css'
import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import { LayoutWrapper } from '@/components/layout-wrappers/LayoutWrapper'

interface Props extends AppProps {
  split?: boolean
}

export default function App({ Component, pageProps, split = false }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head key={'app-meta'}>
        <Meta key={'app-meta'} />
      </Head>
      <Analytics />
      <LayoutWrapper split={split}>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

function getLayout(Component) {
  if (Component.getLayout) {
    return Component.getLayout
  }

  return function Layout(page) {
    return <LayoutWrapper>{page}</LayoutWrapper>
  }
}

function Meta() {
  return <meta content="width=device-width, initial-scale=1" name="viewport" />
}
Meta.displayName = 'Meta'
