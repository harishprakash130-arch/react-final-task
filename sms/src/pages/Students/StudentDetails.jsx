import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useStudents } from '../../context/StudentContext.jsx'

export default function StudentDetails() {
  const { id } = useParams()
  const { students, deleteStudent } = useStudents()
  const navigate = useNavigate()

  const student = students.find((s) => s.id === id)

  useEffect(() => {
    document.title = student ? `EduTrack | ${student.name}` : 'EduTrack | Student Not Found'
  }, [student])

  if (!student) {
    return (
      <div className="empty-state">
        <p>We couldn't find a student with id "{id}".</p>
        <Link to="/students" className="btn btn-outline">
          Back to student list
        </Link>
      </div>
    )
  }

  function handleDelete() {
    if (window.confirm(`Remove ${student.name} from the roster?`)) {
      deleteStudent(student.id)
      navigate('/students')
    }
  }

  return (
    <div className="details-card">
      <div className="details-header">
        <div className="student-avatar large">
          {student.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <h2>{student.name}</h2>
          <p className="muted">{student.email}</p>
        </div>
      </div>

      <dl className="details-grid">
        <div>
          <dt>Course</dt>
          <dd>{student.course}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{student.year}</dd>
        </div>
        <div>
          <dt>Age</dt>
          <dd>{student.age}</dd>
        </div>
        <div>
          <dt>GPA</dt>
          <dd>{student.gpa}</dd>
        </div>
        <div>
          <dt>Joined</dt>
          <dd>{student.joined}</dd>
        </div>
        <div>
          <dt>Student ID</dt>
          <dd>{student.id}</dd>
        </div>
      </dl>

      <div className="details-actions">
        <Link to="/students" className="btn btn-outline">
          ← Back to list
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Remove student
        </button>
      </div>
    </div>
  )
}
