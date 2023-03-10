/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import kebabCase from '@/lib/utils/kebabCase'
import type { Blog, DocumentTypes } from 'contentlayer/generated'

type OrNull<T> = { [K in keyof T]: Exclude<T[K], undefined> | null }
type OrNull2<T> = Record<string, Exclude<T[keyof T], undefined> | null>

const blog: OrNull<Blog> = {
  _id: 'string',
  _raw: 'data doc' as any,
  type: 'Blog',
  title: 'title',
  date: 'date',
  summary: 'summary',
  images: ['image1', 'image2'],
  authors: ['author1'],
  layout: undefined,
  bibliography: undefined,
  canonicalUrl: undefined,
  body: 'mdx' as any,
  readingTime: {},
  slug: 'slug',
  toc: 'toc',
}

// type PickRequired<T> = {
//   [K in keyof T as undefined extends K ? never : K]: T[K] extends undefined ? never : T[K]
// }
// type PickRequired<T> = {
//   [K in keyof T as undefined extends T[K] ? never : K]: T[K]
// }
type KeyOf<T, IfUndefined, IfDefined> = {
  [K in keyof T]: T[K] extends undefined ? IfUndefined : IfDefined
}

type PickRequired<T> = KeyOf<T, never, T[keyof T]>

type ConvertUndefined<T> = OrNull<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>

type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

type Picked<Keys extends keyof Obj, Obj> = ConvertPick<Record<Keys, Obj[Keys]>>
/**
 *
 * https://github.com/contentlayerdev/contentlayer/issues/24
 */
export const pick = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Picked<Keys, Obj> =>
  keys.reduce((acc, key) => ((acc[key] = obj[key] ?? null), acc), {} as any)

pick(blog, ['layout', 'bibliography', 'canonicalUrl', 'authors', 'slug', 'toc', 'summary'])

export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj)
  keys.forEach((key) => {
    delete result[key]
  })
  return result
  // return Object.entries(obj).filter(([key]) => !(key in keys) && !keys.includes(key))
}

export const dateSortDesc = (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)

export const sortedBlogPost = (allBlogs: Blog[]) =>
  allBlogs.sort(({ date: dateA }, { date: dateB }) => dateSortDesc(dateA, dateB))

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>
export const coreContent = <T extends DocumentTypes>(content: T) =>
  omit(content, ['body', '_raw', '_id'])
export const allCoreContent = <T extends DocumentTypes>(contents: T[]) => contents.map(coreContent)

// TODO: refactor into contentlayer once compute over all docs is enabled
export async function getAllTags(allBlogs: Blog[]) {
  const tagCount: Record<string, number> = {}
  // Iterate through each post, putting all found tags into `tags`
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}
