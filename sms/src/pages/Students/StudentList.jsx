import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStudents } from '../../context/StudentContext.jsx'
import StudentCard from '../../components/StudentCard.jsx'
import Pagination from '../../components/Pagination.jsx'

const PAGE_SIZE = 4

export default function StudentList() {
  const { students, deleteStudent } = useStudents()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchInputRef = useRef(null)

  const query = searchParams.get('q') || ''
  const course = searchParams.get('course') || 'All'
  const sort = searchParams.get('sort') || 'name-asc'
  const page = Number(searchParams.get('page')) || 1

  useEffect(() => {
    document.title = 'EduTrack | Students'
  }, [])

  const courses = useMemo(
    () => ['All', ...new Set(students.map((s) => s.course))],
    [students]
  )

  const filtered = useMemo(() => {
    let result = students.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    )
    if (course !== 'All') {
      result = result.filter((s) => s.course === course)
    }
    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'gpa-desc':
          return b.gpa - a.gpa
        case 'gpa-asc':
          return a.gpa - b.gpa
        default:
          return a.name.localeCompare(b.name)
      }
    })
    return result
  }, [students, query, course, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  function updateParam(key, value, resetPage = true) {
    const next = new URLSearchParams(searchParams)
    if (value && value !== 'All') {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    if (resetPage) next.delete('page')
    setSearchParams(next)
  }

  function handleClearSearch() {
    updateParam('q', '')
    searchInputRef.current?.focus()
  }

  function handlePageChange(nextPage) {
    const next = new URLSearchParams(searchParams)
    if (nextPage <= 1) {
      next.delete('page')
    } else {
      next.set('page', String(nextPage))
    }
    setSearchParams(next)
  }

  function handleDelete(id) {
    if (window.confirm('Remove this student from the roster?')) {
      deleteStudent(id)
    }
  }

  return (
    <div>
      <div className="filter-bar">
        <div className="search-field">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search students by name..."
            value={query}
            onChange={(e) => updateParam('q', e.target.value)}
          />
          {query && (
            <button className="link-btn" onClick={handleClearSearch}>
              Clear
            </button>
          )}
        </div>

        <select value={course} onChange={(e) => updateParam('course', e.target.value)}>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => updateParam('sort', e.target.value, false)}>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="gpa-desc">GPA (High–Low)</option>
          <option value="gpa-asc">GPA (Low–High)</option>
        </select>
      </div>

      <p className="result-count">
        {filtered.length} student{filtered.length !== 1 ? 's' : ''} found
      </p>

      {paginated.length === 0 ? (
        <div className="empty-state">
          <p>No students match your search or filter.</p>
        </div>
      ) : (
        <div className="student-grid">
          {paginated.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
