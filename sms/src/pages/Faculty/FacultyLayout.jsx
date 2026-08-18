import { Outlet } from 'react-router-dom'

export default function FacultyLayout() {
  return (
    <div className="page">
      <section className="section-header">
        <span className="eyebrow">Faculty Directory</span>
        <h1>Faculty</h1>
        <p>
          Live contact directory, fetched from an external API to demonstrate
          real-world data fetching, loading states, and error handling.
        </p>
      </section>
      <Outlet />
    </div>
  )
}
