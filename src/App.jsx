import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";

// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/Homepage";
import Knowledgebase from "./pages/AIKnowledgebase";
import Grid from "./pages/Grid";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import AboutProducts from "./pages/AboutProducts";
import Configuration from "./pages/Configuration";
import Documentation from "./pages/Documentation";
import AccountSettings from "./pages/AccountSettings";
import TraningTutorials from "./pages/TraningTutorials";
import InstallationGuides from "./pages/InstallationGuides";
import AllCourses from "./pages/AllCourses";
import SingleCourse from "./pages/SingleCourse";
import ProductsSection from "./pages/ProductsSection";
import SingleProduct from "./pages/SingleProduct";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
// import Footer from "./components/Footer";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
// You can add other pages like KnowledgebasePage later
import OverviewPanel from "./pages/OverviewPanel";
import EnrolledCourses from "./pages/EnrolledCourses";
import Deadlines from "./pages/Deadlines";
import Performance from "./pages/Performance";
import Quizzes from "./pages/Quizzes";
import Notes from "./pages/Notes";
import Forum from "./pages/Forum";
import Certificates from "./pages/Certificates";
import Gamification from "./pages/Gamification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/knowledgebase" element={<Knowledgebase />} />
          <Route path="/Grid" element={<Grid />} />
          <Route
            path="/knowledgebase/about-products"
            element={<AboutProducts />}
          />
          <Route
            path="/knowledgebase/about-products"
            element={<AboutProducts />}
          />
          <Route
            path="/knowledgebase/configuration"
            element={<Configuration />}
          />
          <Route
            path="/knowledgebase/documentation"
            element={<Documentation />}
          />
          <Route
            path="/knowledgebase/account-settings"
            element={<AccountSettings />}
          />
          <Route
            path="/knowledgebase/training-tutorials"
            element={<TraningTutorials />}
          />
          <Route
            path="/knowledgebase/installation-guides"
            element={<InstallationGuides />}
          />
          <Route path="/knowledgebase/:slug" element={<KnowledgeBasePage />} />
          {/* Later add more routes here */}
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/singlecourse" element={<SingleCourse />} />
          <Route path="/products" element={<ProductsSection />} />
          <Route path="/single-product" element={<SingleProduct />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>

        {/* <Route
          path="/"
          element={<Navigate to="/dashboard/overview" replace />}
        /> */}

        {/* Dashboard Layout Route */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route index element={<OverviewPanel />} /> {/* default sub-route */}
          <Route path="overview" element={<OverviewPanel />} />
          <Route path="courses" element={<EnrolledCourses />} />
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="performance" element={<Performance />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="notes" element={<Notes />} />
          <Route path="forum" element={<Forum />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="gamification" element={<Gamification />} />
        </Route>
        {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        {/* Protected routes */}
        {/* <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        Catch all - redirect to login or 404 */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
