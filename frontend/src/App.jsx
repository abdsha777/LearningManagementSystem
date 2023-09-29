import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Navigation from './forDeveloping/Navigation'
import TeacherCourseDetail from './pages/teacher/TeacherCourseDetail'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentCourseDetail from './pages/student/StudentCourseDetail'
import TeacherUnitDetail from './pages/teacher/TeacherUnitDetail'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigation />}></Route>
            <Route path='teacherCourseDetail' element={<TeacherCourseDetail />} />
            <Route path='studentDashboard' element={<StudentDashboard />} />
            <Route path='studentCourseDetail' element={<StudentCourseDetail />} />
            <Route path='teacherUnitDetail' element={<TeacherUnitDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
