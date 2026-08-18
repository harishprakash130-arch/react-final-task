import { useEffect, useId, useRef, useState } from 'react'

const initialForm = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.subject.trim()) errors.subject = 'Please add a subject.'
  if (!form.message.trim()) {
    errors.message = 'Please enter a message.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.'
  }
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const messageRef = useRef(null)

  const nameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const messageId = useId()

  useEffect(() => {
    document.title = 'EduTrack | Contact'
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.message) messageRef.current?.focus()
      setSubmitted(false)
      return
    }

    // Simulated submission - in a real app this would call an API.
    setSubmitted(true)
    setForm(initialForm)
    setErrors({})
  }

  return (
    <div className="page narrow">
      <section className="section-header">
        <span className="eyebrow">Get in touch</span>
        <h1>Contact the registrar's office</h1>
        <p>Have a question about enrollment, courses, or records? Send us a message.</p>
      </section>

      {submitted && (
        <div className="success-box" role="status">
          ✅ Thanks! Your message has been sent. We'll get back to you soon.
        </div>
      )}

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor={nameId}>Full name</label>
          <input
            id={nameId}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'invalid' : ''}
            placeholder="Jordan Rivera"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <label htmlFor={emailId}>Email address</label>
          <input
            id={emailId}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'invalid' : ''}
            placeholder="jordan@example.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-row">
          <label htmlFor={subjectId}>Subject</label>
          <input
            id={subjectId}
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            className={errors.subject ? 'invalid' : ''}
            placeholder="Question about course registration"
          />
          {errors.subject && <span className="field-error">{errors.subject}</span>}
        </div>

        <div className="form-row">
          <label htmlFor={messageId}>Message</label>
          <textarea
            id={messageId}
            name="message"
            ref={messageRef}
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={errors.message ? 'invalid' : ''}
            placeholder="Tell us how we can help..."
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Send message
        </button>
      </form>
    </div>
  )
}
