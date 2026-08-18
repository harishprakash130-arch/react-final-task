# EduTrack — Student Management System

A responsive React frontend built with **Vite + React Router DOM** for a training
assignment. It manages student enrollment, a course catalog, and a faculty
directory (backed by a live API).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Pages / routing map

```
/                       Home
/about                  About
/students               Students (nested layout)
  /students             → StudentList   (search, filter, sort, pagination via URL params)
  /students/add         → AddStudent    (validated form)
  /students/:id         → StudentDetails (dynamic route)
/faculty                Faculty (nested layout, API-backed)
  /faculty               → FacultyList   (fetches JSONPlaceholder users, search)
  /faculty/:id            → FacultyDetails (dynamic route, fetches single user)
/courses                Courses (nested layout)
  /courses               → CourseList    (category filter + search via URL params)
  /courses/:courseId     → CourseDetails (dynamic route)
/contact                Contact (validated contact form)
*                       NotFound (404)
```

## Where each requirement is demonstrated

| Requirement | Implementation |
|---|---|
| 5+ main pages | Home, About, Students, Faculty, Courses, Contact |
| Nested routing | `students`, `faculty`, `courses` each have a layout route with an `<Outlet />` and child routes |
| Dynamic routing (`useParams`) | `StudentDetails`, `FacultyDetails`, `CourseDetails` |
| URL search params (`useSearchParams`) | Student search/filter/sort/pagination, Course category filter, Faculty search |
| API integration | `useFetch` custom hook calls `https://jsonplaceholder.typicode.com/users` in `FacultyList` / `FacultyDetails`, with loading and error states |
| Form + validation | `AddStudent` and `Contact` — required fields, email/number format checks, inline error messages |
| `useState` | Forms, navbar menu toggle, filters |
| `useEffect` | Setting `document.title`, scroll-to-top on route change, data fetching |
| `useRef` | Focusing inputs (search box, first invalid form field) |
| `useContext` | `ThemeContext` (light/dark mode), `StudentContext` (global student data) |
| `useReducer` | `StudentContext` manages add/delete/reset actions |
| `useId` | Accessible label/input pairing in both forms |
| Custom hooks | `useFetch` (API calls), `useLocalStorage` (persistence) |
| `Link` / `NavLink` | Navbar, sub-navigation tabs, card links |
| `useNavigate` | Redirect to the new student's detail page after enrollment |
| Conditional & list rendering | Empty states, loading/error states, `.map()` over students/courses/faculty |
| Responsive design | CSS Grid layouts collapse at 860px/720px/480px breakpoints; mobile hamburger nav |

## Notes

- Student data is seeded and then persisted to `localStorage` so additions and
  removals survive a page refresh.
- The Faculty directory intentionally uses a real external API to demonstrate
  loading and error handling with a genuine network request.
- Course data is static (no public "courses" API exists) but is filtered,
  searched, and routed dynamically like any other resource.
