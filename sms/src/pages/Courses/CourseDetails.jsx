import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import coursesData from '../../data/coursesData.js'

export default function CourseDetails() {
  const { courseId } = useParams()
  const course = coursesData.find((c) => c.id === courseId)

  useEffect(() => {
    document.title = course ? `EduTrack | ${course.name}` : 'EduTrack | Course Not Found'
  }, [course])

  if (!course) {
    return (
      <div className="empty-state">
        <p>We couldn't find a course with id "{courseId}".</p>
        <Link to="/courses" className="btn btn-outline">
          Back to course catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="details-card">
      <div className="details-header">
        <div>
          <span className="tag tag-accent">{course.category}</span>
          <h2>{course.name}</h2>
          <p className="muted">Taught by {course.instructor}</p>
        </div>
      </div>

      <p>{course.description}</p>

      <dl className="details-grid">
        <div>
          <dt>Duration</dt>
          <dd>{course.duration}</dd>
        </div>
        <div>
          <dt>Available seats</dt>
          <dd>{course.seats}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{course.category}</dd>
        </div>
        <div>
          <dt>Instructor</dt>
          <dd>{course.instructor}</dd>
        </div>
      </dl>

      <div className="details-actions">
        <Link to="/courses" className="btn btn-outline">
          ← Back to catalog
        </Link>
        <Link to="/students/add" className="btn btn-primary">
          Enroll a student
        </Link>
      </div>
    </div>
  )
}
