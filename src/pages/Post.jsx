import { useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { posts } from '../data/posts'
import SystemDesignSliders from '../components/SystemDesignSliders'

function Post() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return <Navigate to="/" replace />
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  // Special handling for System Design Sliders post
  if (post.slug === 'system-design-sliders') {
    return (
      <article className="jp-post">
        <header className="jp-post-header">
          <h1 className="jp-post-title">{post.title}</h1>
          <span className="jp-post-date">{formatDate(post.date)}</span>
        </header>
        <div className="jp-post-content">
          <p>A cheatsheet to help prepare for system design interviews.</p>
          <SystemDesignSliders />
        </div>
        <div className="jp-wave-divider"></div>
      </article>
    )
  }

  return (
    <article className="jp-post">
      <header className="jp-post-header">
        <h1 className="jp-post-title">{post.title}</h1>
        <span className="jp-post-date">{formatDate(post.date)}</span>
      </header>
      <div className="jp-post-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <div className="jp-wave-divider"></div>
    </article>
  )
}

export default Post
