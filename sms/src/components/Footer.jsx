export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} EduTrack. Built with React &amp; React Router.</p>
        <p className="footer-note">A training project demonstrating modern frontend development.</p>
      </div>
    </footer>
  )
}
