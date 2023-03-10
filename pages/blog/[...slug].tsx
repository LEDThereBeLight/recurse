import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { sortedBlogPost, coreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs, allAuthors } from 'contentlayer/generated'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async (props: { params: { slug: string[] } }) => {
  const slug = props.params.slug.join('/')
  const postIndex = sortedBlogPost(allBlogs).findIndex((p) => p.slug === slug)
  const prevPost = sortedBlogPost(allBlogs)[postIndex + 1] || null
  const nextPost = sortedBlogPost(allBlogs)[postIndex - 1] || null
  const post = sortedBlogPost(allBlogs).find((p) => p.slug === slug)

  return {
    props: {
      post,
      authorDetails: (post.authors || ['default']).map((author) =>
        coreContent(allAuthors.find(({ slug }) => slug === author))
      ),
      prev: prevPost ? coreContent(prevPost) : null,
      next: nextPost ? coreContent(nextPost) : null,
    },
  }
}

export default function Blog({ post, ...props }: InferGetStaticPropsType<typeof getStaticProps>) {
  const published = 'draft' in post && post.draft !== true

  return (
    <>
      {published ? (
        <MDXLayoutRenderer
          layout={post.layout || DEFAULT_LAYOUT}
          toc={post.toc}
          content={post}
          {...props}
        />
      ) : (
        <Draft />
      )}
    </>
  )
}

function Draft() {
  return (
    <div className="mt-24 text-center">
      <PageTitle>
        Under Construction{' '}
        <span role="img" aria-label="roadwork sign">
          🚧
        </span>
      </PageTitle>
    </div>
  )
}
