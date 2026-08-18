import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudents } from '../../context/StudentContext.jsx'

const initialForm = {
  name: '',
  email: '',
  age: '',
  course: 'Computer Science',
  year: '1st Year',
  gpa: '',
}

const courseOptions = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Business Administration',
  'Marketing Analytics',
  'Graphic Design',
  'Psychology',
]

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Student name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }
  const age = Number(form.age)
  if (!form.age) {
    errors.age = 'Age is required.'
  } else if (Number.isNaN(age) || age < 15 || age > 65) {
    errors.age = 'Age must be a number between 15 and 65.'
  }
  const gpa = Number(form.gpa)
  if (!form.gpa) {
    errors.gpa = 'GPA is required.'
  } else if (Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
    errors.gpa = 'GPA must be a number between 0 and 4.'
  }
  return errors
}

export default function AddStudent() {
  const { addStudent } = useStudents()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const nameInputRef = useRef(null)

  const nameId = useId()
  const emailId = useId()
  const ageId = useId()
  const courseId = useId()
  const yearId = useId()
  const gpaId = useId()

  useEffect(() => {
    document.title = 'EduTrack | Add Student'
    nameInputRef.current?.focus()
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
      if (validationErrors.name) nameInputRef.current?.focus()
      return
    }

    const newStudent = addStudent({
      name: form.name.trim(),
      email: form.email.trim(),
      age: Number(form.age),
      course: form.course,
      year: form.year,
      gpa: Number(form.gpa),
    })

    navigate(`/students/${newStudent.id}`)
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-row">
          <label htmlFor={nameId}>Full name</label>
          <input
            id={nameId}
            ref={nameInputRef}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'invalid' : ''}
            placeholder="e.g. Maria Gonzalez"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <label htmlFor={emailId}>Email</label>
          <input
            id={emailId}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'invalid' : ''}
            placeholder="maria@example.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-row">
          <label htmlFor={ageId}>Age</label>
          <input
            id={ageId}
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className={errors.age ? 'invalid' : ''}
            placeholder="20"
          />
          {errors.age && <span className="field-error">{errors.age}</span>}
        </div>

        <div className="form-row">
          <label htmlFor={gpaId}>GPA</label>
          <input
            id={gpaId}
            name="gpa"
            type="number"
            step="0.1"
            value={form.gpa}
            onChange={handleChange}
            className={errors.gpa ? 'invalid' : ''}
            placeholder="3.5"
          />
          {errors.gpa && <span className="field-error">{errors.gpa}</span>}
        </div>

        <div className="form-row">
          <label htmlFor={courseId}>Course</label>
          <select id={courseId} name="course" value={form.course} onChange={handleChange}>
            {courseOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor={yearId}>Year</label>
          <select id={yearId} name="year" value={form.year} onChange={handleChange}>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Enroll Student
      </button>
    </form>
  )
}
