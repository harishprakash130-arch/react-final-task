import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import Loader from '../../components/Loader.jsx'
import ErrorMessage from '../../components/ErrorMessage.jsx'

export default function FacultyDetails() {
  const { id } = useParams()
  const { data: person, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )

  useEffect(() => {
    document.title = person ? `EduTrack | ${person.name}` : 'EduTrack | Faculty'
  }, [person])

  if (loading) return <Loader label="Loading faculty profile..." />
  if (error) return <ErrorMessage message={error} />
  if (!person) return null

  return (
    <div className="details-card">
      <div className="details-header">
        <div className="student-avatar large">
          {person.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <h2>{person.name}</h2>
          <p className="muted">{person.company?.name} · {person.company?.bs}</p>
        </div>
      </div>

      <dl className="details-grid">
        <div>
          <dt>Email</dt>
          <dd>{person.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{person.phone}</dd>
        </div>
        <div>
          <dt>Website</dt>
          <dd>{person.website}</dd>
        </div>
        <div>
          <dt>City</dt>
          <dd>{person.address?.city}</dd>
        </div>
        <div>
          <dt>Username</dt>
          <dd>@{person.username}</dd>
        </div>
        <div>
          <dt>Faculty ID</dt>
          <dd>{person.id}</dd>
        </div>
      </dl>

      <div className="details-actions">
        <Link to="/faculty" className="btn btn-outline">
          ← Back to directory
        </Link>
      </div>
    </div>
  )
}
