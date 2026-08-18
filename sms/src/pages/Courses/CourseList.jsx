import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import coursesData from '../../data/coursesData.js'

export default function CourseList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'All'
  const query = searchParams.get('q') || ''

  useEffect(() => {
    document.title = 'EduTrack | Courses'
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(coursesData.map((c) => c.category))],
    []
  )

  const filtered = useMemo(() => {
    return coursesData.filter((c) => {
      const matchesCategory = category === 'All' || c.category === category
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  function handleCategoryClick(cat) {
    const next = new URLSearchParams(searchParams)
    if (cat === 'All') {
      next.delete('category')
    } else {
      next.set('category', cat)
    }
    setSearchParams(next)
  }

  function handleSearchChange(e) {
    const next = new URLSearchParams(searchParams)
    if (e.target.value) {
      next.set('q', e.target.value)
    } else {
      next.delete('q')
    }
    setSearchParams(next)
  }

  return (
    <div>
      <div className="filter-bar">
        <div className="search-field">
          <input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={handleSearchChange}
          />
        </div>
        <div className="chip-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No courses match your search or category.</p>
        </div>
      ) : (
        <div className="course-grid">
          {filtered.map((course) => (
            <Link to={`/courses/${course.id}`} className="card course-card" key={course.id}>
              <span className="tag">{course.category}</span>
              <h3>{course.name}</h3>
              <p className="muted">{course.duration} · {course.seats} seats</p>
              <p>{course.description.slice(0, 90)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
