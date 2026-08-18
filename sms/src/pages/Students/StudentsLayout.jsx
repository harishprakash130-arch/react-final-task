import { NavLink, Outlet } from 'react-router-dom'

export default function StudentsLayout() {
  return (
    <div className="page">
      <section className="section-header">
        <span className="eyebrow">Student Records</span>
        <h1>Students</h1>
        <p>Search, filter, and manage every student enrolled at Riverside Institute of Technology.</p>
      </section>

      <nav className="subnav">
        <NavLink to="/students" end className={({ isActive }) => 'subnav-link' + (isActive ? ' active' : '')}>
          All Students
        </NavLink>
        <NavLink to="/students/add" className={({ isActive }) => 'subnav-link' + (isActive ? ' active' : '')}>
          Add Student
        </NavLink>
      </nav>

      <Outlet />
    </div>
  )
}
