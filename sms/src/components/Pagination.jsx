export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button
        className="btn btn-small"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        ← Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`btn btn-small page-btn ${p === page ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        className="btn btn-small"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next →
      </button>
    </div>
  )
}
