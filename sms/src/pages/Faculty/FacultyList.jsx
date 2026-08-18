import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import Loader from '../../components/Loader.jsx'
import ErrorMessage from '../../components/ErrorMessage.jsx'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export default function FacultyList() {
  const { data, loading, error } = useFetch(API_URL)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    document.title = 'EduTrack | Faculty'
  }, [])

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter(
      (person) =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.company.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [data, query])

  function handleSearchChange(e) {
    const next = new URLSearchParams(searchParams)
    if (e.target.value) {
      next.set('q', e.target.value)
    } else {
      next.delete('q')
    }
    setSearchParams(next)
  }

  if (loading) return <Loader label="Loading faculty directory..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <div className="filter-bar">
        <div className="search-field">
          <input
            type="text"
            placeholder="Search by name or department..."
            value={query}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <p className="result-count">
        {filtered.length} faculty member{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No faculty match your search.</p>
        </div>
      ) : (
        <div className="faculty-grid">
          {filtered.map((person) => (
            <Link to={`/faculty/${person.id}`} className="card faculty-card" key={person.id}>
              <h3>{person.name}</h3>
              <p className="muted">{person.company.name}</p>
              <p>{person.email}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
