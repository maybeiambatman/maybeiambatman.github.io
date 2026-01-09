import { Link } from 'react-router-dom'
import { posts } from '../data/posts'

function Home() {
  // Sort posts by date descending
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getExcerpt = (content, wordCount = 40) => {
    // Strip HTML/markdown and get first N words
    const text = content.replace(/<[^>]*>/g, '').replace(/[#*`\[\]]/g, '')
    const words = text.split(/\s+/).slice(0, wordCount)
    return words.join(' ') + '...'
  }

  return (
    <ul className="jp-posts">
      {sortedPosts.map(post => (
        <li key={post.slug} className="jp-post-item">
          <h2 className="jp-post-title">
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </h2>
          <span className="jp-post-date">{formatDate(post.date)}</span>
          <p className="jp-post-excerpt">{getExcerpt(post.content)}</p>
          <Link to={`/posts/${post.slug}`} className="jp-read-more">Continue reading →</Link>
        </li>
      ))}
    </ul>
  )
}

export default Home
