import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";

// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Homepage";
import AllCourses from "./pages/AllCourses";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
// import Footer from "./components/Footer";

// import SearchBar from "./components/SearchBar";
import CourseDetail from "./components/CourseDetail";

import ProtectedRoute from "./pages/ProtectedRoute";

// Instructor pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorHome from "./pages/instructor/InstructorHome";
import EditCourse from "./pages/instructor/EditCourse";
import CourseMaterials from "./pages/instructor/CourseMaterials";
import AddCourse from "./pages/instructor/AddCourse";
import InstructorQuizzes from "./pages/instructor/InstructorQuizzes";
import AddQuiz from "./pages/instructor/AddQuiz";
import EditQuiz from "./pages/instructor/EditQuiz";
import EnrolledStudents from "./pages/instructor/EnrolledStudents";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentHome from "./pages/student/StudentHome";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentCourses from "./pages/student/StudentCourses";
import StudentProfile from "./pages/student/StudentProfile";
import AllStudentCourses from "./pages/student/AllStudentCourses";
import CourseDetails from "./pages/student/CourseDetails";
import StudentQuizzes from "./pages/student/StudentQuizzes";
import AttemptQuiz from "./pages/student/AttemptQuiz";
import QuizResult from "./pages/student/QuizResult";
import InstructorsList from "./pages/student/InstructorsList";
import InstructorProfile from "./pages/instructor/InstructorProfile";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import UserManagement from "./pages/admin/UserManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import AdminProfile from "./pages/admin/AdminProfile";

function App() {
  return (
    <Router>
      {/* <SearchBar /> */}
      <Routes>
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path="student-home" element={<StudentHome />} />
          <Route path="courses/:id" element={<StudentCourseDetail />} />
          <Route path="all-courses" element={<AllStudentCourses />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="course/:id" element={<CourseDetails />} />
          <Route path="quizzes" element={<StudentQuizzes />} />
          <Route path="quiz/:id/attempt" element={<AttemptQuiz />} />
          <Route path="quiz-result/:id" element={<QuizResult />} />
          <Route path="instructors" element={<InstructorsList />} />
        </Route>

        {/* Instructor Dashboard Routes */}
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<InstructorHome />} />
          <Route path="home" element={<InstructorHome />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="courses/:id/edit" element={<EditCourse />} />
          <Route path="courses/:id/materials" element={<CourseMaterials />} />
          <Route path="quizzes" element={<InstructorQuizzes />} />
          <Route path="add-quiz" element={<AddQuiz />} />
          <Route path="quizzes/:id/edit" element={<EditQuiz />} />
          <Route path="students" element={<EnrolledStudents />} />
          <Route path="profile" element={<InstructorProfile />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
