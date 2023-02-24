import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  left: ReactNode
  right: ReactNode
}

const ContentLeft = styled.aside.attrs({
  className: 'bg-gray-900 text-white w-0 lg:w-1/2 min-h-screen',
})``

const ContentRight = styled.main.attrs({
  className: 'py-28 lg:py-64 pl-0 lg:pl-20 mx-auto  lg:mx-0 w-content max-w-4/5 lg:max-w-none',
})``

const Container = styled.div.attrs({
  className: 'flex w-screen lg:w-auto min-w-auto mb-auto lg:min-w-20',
})``

export default function SplitLayout({ left, right }: Props) {
  return (
    <Container>
      <ContentLeft>{left}</ContentLeft>
      {/* text-gray-900 */}
      <div className="w-100% lg:w-1/2">
        <ContentRight>{right}</ContentRight>
      </div>
    </Container>
  )
}

{
  /* <Global
        styles={css`
          body {
            margin: 0;
          }
          @media (max-width: 1020px) {
            body {
              overflow-x: ${responsive ? 'hidden' : 'visible'};
            }
          }
        `}
      /> */
}
