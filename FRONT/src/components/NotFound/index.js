import './style.scss'

function NotFound() {
  return (
    <div className="errorpage-content">
      <div className="error-title">
        <h1 className="error_404">404</h1>
      </div>
      <div className="error-subtitle">
        <h2>La page que vous demandez n'existe pas.</h2>
      </div>
    </div>
  )
}

export default NotFound;
