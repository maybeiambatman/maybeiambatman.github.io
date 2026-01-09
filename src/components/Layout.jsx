import { Link } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="jp-container">
      <header className="jp-header">
        <h1 className="jp-site-title">
          <Link to="/">mohd irte<b>za</b></Link>
        </h1>
        <p className="jp-site-tagline">I engineer software</p>
        <nav className="jp-nav">
          <Link to="/" className="jp-nav-link">Home</Link>
          <Link to="/about" className="jp-nav-link">About</Link>
        </nav>
      </header>

      <main className="jp-main">
        {children}
      </main>

      <footer className="jp-footer">
        <span className="jp-footer-wave">〰</span>
        <p>&copy; {new Date().getFullYear()} mohd irteza</p>
      </footer>
    </div>
  )
}

export default Layout
