import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStudents } from '../context/StudentContext.jsx'
import coursesData from '../data/coursesData.js'

export default function Home() {
  const { students } = useStudents()

  useEffect(() => {
    document.title = 'EduTrack | Home'
  }, [])

  const avgGpa = (
    students.reduce((sum, s) => sum + Number(s.gpa || 0), 0) / (students.length || 1)
  ).toFixed(2)

  const stats = [
    { label: 'Enrolled Students', value: students.length },
    { label: 'Active Courses', value: coursesData.length },
    { label: 'Average GPA', value: avgGpa },
    { label: 'Faculty Members', value: '10+' },
  ]

  const features = [
    {
      title: 'Student Records',
      desc: 'Add new students, browse the full roster, search and filter by course, and view detailed profiles.',
      to: '/students',
    },
    {
      title: 'Course Catalog',
      desc: 'Explore available programs by category, from Engineering to the Arts, with instructor and seat info.',
      to: '/courses',
    },
    {
      title: 'Faculty Directory',
      desc: 'Look up faculty contact details, pulled live from an external directory API.',
      to: '/faculty',
    },
  ]

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Student Management System</span>
          <h1>Run your campus records with EduTrack</h1>
          <p>
            EduTrack helps administrators manage student enrollment, course
            catalogs, and faculty directories from a single, responsive
            dashboard — built entirely with React and React Router.
          </p>
          <div className="hero-actions">
            <Link to="/students/add" className="btn btn-primary">
              Enroll a Student
            </Link>
            <Link to="/courses" className="btn btn-outline">
              Browse Courses
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <h3>Today at a glance</h3>
          <ul>
            <li>
              <span>Newest student</span>
              <strong>{students[students.length - 1]?.name ?? '—'}</strong>
            </li>
            <li>
              <span>Most popular course</span>
              <strong>Computer Science</strong>
            </li>
            <li>
              <span>Open enrollment</span>
              <strong>Fall Semester</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="feature-section">
        <h2>Everything you need in one place</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <Link to={f.to} className="feature-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-link">Explore →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
