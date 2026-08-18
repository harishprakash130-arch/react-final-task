import { useEffect } from 'react'

const timeline = [
  { year: '2018', text: 'Riverside Institute of Technology opens its doors with 3 founding programs.' },
  { year: '2020', text: 'Student records move online for the first time, replacing paper-based files.' },
  { year: '2023', text: 'Faculty directory and course catalog are unified into a single portal.' },
  { year: '2026', text: 'EduTrack launches — a modern, responsive dashboard for the whole campus.' },
]

const values = [
  {
    title: 'Clarity',
    desc: 'Every student record, course, and faculty profile is easy to find and easy to read.',
  },
  {
    title: 'Reliability',
    desc: 'Enrollment data is saved automatically, so nothing is lost between sessions.',
  },
  {
    title: 'Accessibility',
    desc: 'The dashboard is fully responsive and usable on desktop, tablet, and mobile devices.',
  },
]

export default function About() {
  useEffect(() => {
    document.title = 'EduTrack | About'
  }, [])

  return (
    <div className="page">
      <section className="section-header">
        <span className="eyebrow">About EduTrack</span>
        <h1>Built to make campus administration simple</h1>
        <p>
          EduTrack is the student management system used by Riverside
          Institute of Technology to track enrollment, coursework, and
          faculty contacts across every department.
        </p>
      </section>

      <section className="values-grid">
        {values.map((v) => (
          <div className="card" key={v.title}>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="timeline">
        <h2>Our journey</h2>
        <ol>
          {timeline.map((item) => (
            <li key={item.year}>
              <span className="timeline-year">{item.year}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
