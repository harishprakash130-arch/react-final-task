import { createContext, useContext, useReducer, useEffect } from 'react'
import seedStudents from '../data/seedStudents.js'

const StudentContext = createContext(null)
const STORAGE_KEY = 'sms-students'

function loadInitialState() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : seedStudents
  } catch {
    return seedStudents
  }
}

function studentsReducer(state, action) {
  switch (action.type) {
    case 'ADD_STUDENT':
      return [...state, action.payload]
    case 'DELETE_STUDENT':
      return state.filter((s) => s.id !== action.payload)
    case 'RESET':
      return seedStudents
    default:
      return state
  }
}

export function StudentProvider({ children }) {
  const [students, dispatch] = useReducer(studentsReducer, undefined, loadInitialState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }, [students])

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: `stu-${Date.now()}`,
      joined: new Date().toISOString().slice(0, 10),
    }
    dispatch({ type: 'ADD_STUDENT', payload: newStudent })
    return newStudent
  }

  function deleteStudent(id) {
    dispatch({ type: 'DELETE_STUDENT', payload: id })
  }

  function resetStudents() {
    dispatch({ type: 'RESET' })
  }

  return (
    <StudentContext.Provider value={{ students, addStudent, deleteStudent, resetStudents }}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudents() {
  const ctx = useContext(StudentContext)
  if (!ctx) throw new Error('useStudents must be used within a StudentProvider')
  return ctx
}
