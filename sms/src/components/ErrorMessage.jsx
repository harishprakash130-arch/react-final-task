export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p>⚠️ {message || 'Something went wrong. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
