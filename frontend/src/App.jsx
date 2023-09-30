import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Navigation from './forDeveloping/Navigation'
import TeacherCourseDetail from './pages/teacher/TeacherCourseDetail'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentCourseDetail from './pages/student/StudentCourseDetail'
import TeacherUnitDetail from './pages/teacher/TeacherUnitDetail'
import TeacherViewTest from './pages/teacher/TeacherViewTest'
import StudentTest from './pages/student/StudentTest'
import StudentUnitDetail from './pages/student/StudentUnitDetail'
import AdminDashboard from './pages/admin/AdminDashboard'
import StudentVideo from './pages/student/StudentVideo'
import TeacherMyCourses from './pages/teacher/TeacherMyCourses'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherCourseList from './pages/teacher/TeacherCourseList'
import TeacherStudentList from './pages/teacher/TeacherStudentList'
import AdminTeacherList from './pages/admin/AdminTeacherList'
import AdminStudentList from './pages/admin/AdminStudentList'
import Certificates from './pages/student/Certificates'



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
            <Route path='studentUnitDetail' element={<StudentUnitDetail />} />
            <Route path='teacherViewTest' element={<TeacherViewTest />} />
            <Route path='studentTest' element={<StudentTest />} />
            <Route path='adminDashboard' element={<AdminDashboard />} />
            <Route path='studentVideo' element={<StudentVideo />} />
            <Route path='teacherCourses' element={<TeacherMyCourses />} />
            <Route path='teacherDashboard' element={<TeacherDashboard />} />
            <Route path='teacherCourseList' element={<TeacherCourseList />} />
            <Route path='teacherStudentList' element={<TeacherStudentList />} />
            <Route path='adminTeacherList' element={<AdminTeacherList />} />
            <Route path='adminStudentList' element={<AdminStudentList />} />
            <Route path='certificates' element={<Certificates />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
