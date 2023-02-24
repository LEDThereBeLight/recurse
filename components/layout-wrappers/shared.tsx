import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { ReactChild, ReactFragment, ReactPortal } from 'react'
import Link from '../Link'
import MobileNav from '../MobileNav'
import ThemeSwitch from '../ThemeSwitch'

export function HeaderTitleLink() {
  return (
    <div>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
    </div>
  )
}

export function NavLink(props: {
  link: { href: string; title: boolean | ReactChild | ReactFragment | ReactPortal }
}) {
  return (
    <Link
      href={props.link.href}
      className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
    >
      {props.link.title}
    </Link>
  )
}

export function HeaderNav() {
  return (
    <div className="flex items-center text-base leading-5">
      <div className="hidden sm:block">
        {headerNavLinks.map((link) => (
          <NavLink key={link.title} link={link}></NavLink>
        ))}
      </div>
      <ThemeSwitch />
      <MobileNav />
    </div>
  )
}

export function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <HeaderTitleLink />
      <HeaderNav />
    </header>
  )
}
