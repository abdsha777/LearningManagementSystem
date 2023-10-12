import './App.css'
// css files
import './pages/teacher/TeacherCourseDetail.css'
import './pages/teacher/TeacherUnitDetail.css'
import './pages/teacher/TeacherDashboard.css'
import './pages/teacher/TeacherStudentList.css'
//css end
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import StudentCourseDetail from './pages/student/StudentCourseDetail'
import StudentTest from './pages/student/StudentTest'
import StudentUnitDetail from './pages/student/StudentUnitDetail'
import StudentVideo from './pages/student/StudentVideo'
import TeacherMyCourses from './pages/teacher/TeacherMyCourses'
import Certificates from './pages/student/Certificates'
import Login from './pages/auth/Login'
import PrivateRoute from './components/private/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import StudentPrivateRoute from './components/private/StudentPrivateRoute'
import TeacherPrivateRoute from './components/private/TeacherPrivateRoute'
import AuthProvider from './context/AuthProvider'
import MyCourse from './components/myCourse/MyCourse'
import TeacherStudentList from './pages/teacher/TeacherStudentList'
import TeacherCourseList from './pages/teacher/TeacherCourseList'
import StudentSearchCourse from './pages/student/StudentSearchCourse'
import AdminPrivateRoute from './components/private/AdminPrivateRoute'
import AdminTeacherList from './pages/admin/AdminTeacherList'
import AdminStudentList from './pages/admin/AdminStudentList'
import AdminCourseList from './pages/admin/AdminCourseList'
import TeacherStudentProfile from './pages/teacher/TeacherStudentProfile'
import DoubtMessages from './components/chat/DoubtMessages'
import AllDoubts from './components/chat/AllDoubts'
import LandingPage from './components/landing/LandingPage'
import AddCourse from './pages/teacher/AddCourse'


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            {/* <Route path='/home' element={<LandingPage />} /> */}
            <Route path='/' element={<Layout />}>

              <Route element={<PrivateRoute />}>

                <Route index element={<Dashboard />} />
                <Route path='mycourse/' element={<MyCourse />} />
                <Route path='profile/' element={<TeacherStudentProfile />} />

                <Route element={<StudentPrivateRoute/>}>
                  <Route path='courses/' element={<StudentSearchCourse />} />
                  <Route path='certificate/' element={<Certificates />} />
                  <Route path='courseDetail/:course/' element={<StudentCourseDetail />}>
                    <Route path='' element={<AllDoubts />} />
                    <Route path='doubt/:id/' element={<DoubtMessages />} />
                  </Route>
                  <Route path='courseDetail/:course/unitDetail/:id/' element={<StudentUnitDetail />} />
                  <Route
                    path='courseDetail/:course/unitDetail/:unitId/video/:videoId/'
                    element={<StudentVideo />} 
                  />
                  <Route
                    path='courseDetail/:course/unitDetail/:unitId/test/:testId/'
                    element={<StudentTest />}
                  />
                  <Route
                    path='courseDetail/:course/finaltest/:testId/'
                    element={<StudentTest />}
                  />
                </Route>

                <Route element={<TeacherPrivateRoute />}>
                  <Route path='addCourse/' element={<AddCourse />} />
                  <Route path='courselist/' element={<TeacherCourseList />} />
                  <Route path='teacherstudentlist/' element={<TeacherStudentList />} />
                </Route>
                <Route element={<AdminPrivateRoute />}>
                  <Route path='teacherlist/' element={<AdminTeacherList />} />
                  <Route path='adminStudentlist/' element={<AdminStudentList />} />
                  <Route path='adminCourselist/' element={<AdminCourseList/>} />
                </Route>

              </Route>

            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App


{/* <Route path='/login' element={<Login />} />
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
  <Route path='adminStudentProfile' element={<AdminStudentProfile />} />
  <Route path='certificates' element={<Certificates />} />
  <Route path='studentMyCourse' element={<StudentMyCourse />} />
</Route> */}