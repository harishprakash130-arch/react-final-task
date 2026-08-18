import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

import StudentsLayout from './pages/Students/StudentsLayout.jsx'
import StudentList from './pages/Students/StudentList.jsx'
import AddStudent from './pages/Students/AddStudent.jsx'
import StudentDetails from './pages/Students/StudentDetails.jsx'

import FacultyLayout from './pages/Faculty/FacultyLayout.jsx'
import FacultyList from './pages/Faculty/FacultyList.jsx'
import FacultyDetails from './pages/Faculty/FacultyDetails.jsx'

import CoursesLayout from './pages/Courses/CoursesLayout.jsx'
import CourseList from './pages/Courses/CourseList.jsx'
import CourseDetails from './pages/Courses/CourseDetails.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* Nested routing: Students section */}
        <Route path="students" element={<StudentsLayout />}>
          <Route index element={<StudentList />} />
          <Route path="add" element={<AddStudent />} />
          {/* Dynamic routing via useParams */}
          <Route path=":id" element={<StudentDetails />} />
        </Route>

        {/* Nested routing: Faculty section (API-backed) */}
        <Route path="faculty" element={<FacultyLayout />}>
          <Route index element={<FacultyList />} />
          <Route path=":id" element={<FacultyDetails />} />
        </Route>

        {/* Nested routing: Courses section */}
        <Route path="courses" element={<CoursesLayout />}>
          <Route index element={<CourseList />} />
          <Route path=":courseId" element={<CourseDetails />} />
        </Route>

        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
