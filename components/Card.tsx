import React from 'react'
import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

export const Card = React.memo(function Card({ title, description, imgSrc, href }: CardProps) {
  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc && href ? (
          <ImageLink href={href} title={title} imgSrc={imgSrc} />
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        )}
        <div className="p-6">
          <FooterTitle title={title} href={href} />
          <Description>{description}</Description>
          {href && <LearnMoreLink href={href} title={title} />}
        </div>
      </div>
    </div>
  )
})

function FooterTitle({ href, title }: { href?: string; title: string }) {
  const linkedTitle = (
    <Link href={href} aria-label={`Link to ${title}`}>
      {title}
    </Link>
  )

  return (
    <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
      {href ? linkedTitle : title}
    </h2>
  )
}

function ImageLink({ href, title, imgSrc }: { href: string; title: string; imgSrc: string }) {
  return (
    <Link href={href} aria-label={`Link to `}>
      <Image
        alt={title}
        src={imgSrc}
        className="object-cover object-center md:h-36 lg:h-48"
        width={544}
        height={306}
      />
    </Link>
  )
}

function Description({ children }: { children: string }) {
  return <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{children}</p>
}

function LearnMoreLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      aria-label={`Link to ${title}`}
    >
      Learn more &rarr;
    </Link>
  )
}

// React(Card, { title: 'Card Title', description: 'Card description' })
