import { Link } from 'react-router-dom'

export default function StudentCard({ student, onDelete }) {
  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="card student-card">
      <div className="student-avatar">{initials}</div>
      <div className="student-info">
        <h3>{student.name}</h3>
        <p className="muted">{student.course}</p>
        <div className="tag-row">
          <span className="tag">{student.year}</span>
          <span className="tag tag-accent">GPA {student.gpa}</span>
        </div>
      </div>
      <div className="card-actions">
        <Link to={`/students/${student.id}`} className="btn btn-small">
          View
        </Link>
        {onDelete && (
          <button
            className="btn btn-small btn-danger"
            onClick={() => onDelete(student.id)}
            aria-label={`Remove ${student.name}`}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}
