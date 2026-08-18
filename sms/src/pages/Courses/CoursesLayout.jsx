import { Outlet } from 'react-router-dom'

export default function CoursesLayout() {
  return (
    <div className="page">
      <section className="section-header">
        <span className="eyebrow">Course Catalog</span>
        <h1>Courses</h1>
        <p>Browse programs by category and view detailed curriculum information.</p>
      </section>
      <Outlet />
    </div>
  )
}
