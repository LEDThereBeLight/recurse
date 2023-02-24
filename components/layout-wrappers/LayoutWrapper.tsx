import { ReactNode } from 'react'
import Footer from '../Footer'
import SectionContainer from '../SectionContainer'
import { Header } from './shared'
import SplitLayout from './SplitLayout'

interface Props {
  split?: boolean
  children: ReactNode
}

export function LayoutWrapper({ children, split }: Props) {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <Header />
        {split ? (
          <SplitLayout left="hey" right="there" />
        ) : (
          <main className="mb-auto">{children}</main>
        )}
        <Footer />
      </div>
    </SectionContainer>
  )
}
