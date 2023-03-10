import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent } from '@/lib/utils/contentlayer'
import { POSTS_PER_PAGE } from '../../blog'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { sortedBlogPost } from '../../../lib/utils/contentlayer'

function totalPages(blogPosts: number, postsPerPage = POSTS_PER_PAGE) {
  return Math.ceil(blogPosts / postsPerPage)
}

export const getStaticPaths = async () => ({
  paths: Array.from({ length: totalPages(allBlogs.length) }, (_, i) => ({
    params: { page: `${i + 1}` },
  })),
  fallback: false,
})

export const getStaticProps = async (context: { params: { page: string } }) => {
  const {
    params: { page },
  } = context
  const posts = sortedBlogPost(allBlogs)
  const currentPage = parseInt(page)

  return {
    props: {
      initialDisplayPosts: allCoreContent(
        posts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
      ),
      posts: allCoreContent(posts),
      pagination: {
        currentPage,
        totalPages: totalPages(posts.length),
      },
    },
  }
}

export default function PostPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout {...props} title="All Posts" />
    </>
  )
}
