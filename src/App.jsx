import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./pages/HomePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ActivationCode from "./components/auth/ActivationCode";
import ProfileDashboard from './components/profile/ProfileDashboard';
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProfileIndexPage from './components/profile/ProfileIndexPage'
import UpdateProfileInfo from "./components/profile/updateProfileInfo";
import UpdateProfilePicture from "./components/profile/UpdateProfilePicture";
import UpdateUserPassword from "./components/profile/UpdateUserPassword";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import GetAllUsers from "./components/Admin/GetAllUsers";
import SingleUser from "./components/Admin/SingleUser";
import CoursePage from "./components/courses/CoursePage";
import AdminCoursePage from "./components/courses/AdminCoursePage"
import CreateCourse from "./components/courses/CreateCourse";

const App = () => {
  return (
    <Fragment>
      <Router>
        <section id="navbar">
          <article className="container">
            <aside className="top_header">
              <Navbar />
            </aside>
            <main className="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Auth section */}
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/activate" element={<ActivationCode />} />
                <Route path="/auth/login" element={<Login />} />
                {/* User section*/}

                <Route element={<ProtectedRoutes />}>
                  <Route path="/courses" element={<CoursePage />} />
                  <Route path="/user/profile" element={<ProfileDashboard />} >
                    <Route index element={<ProfileIndexPage />} />
                    <Route path="update-user-info" element={<UpdateProfileInfo />} />
                    <Route path='update-profile-picture' element={<UpdateProfilePicture />} />
                    <Route path="update-user-password" element={<UpdateUserPassword />} />
                  </Route>
                </Route>
                <Route element={<AdminRoute />}>
                  <Route path="/admin/courses" element={<AdminCoursePage />} />
                  <Route path="/admin/create-courses" element={ <CreateCourse /> } />
                  <Route path="admin/admin-dashboard" element={<AdminDashboard />}>
                    <Route index element={<GetAllUsers />} />
                    <Route path="user/:id" element={<SingleUser />} />
                  </Route>
                </Route>
              </Routes>
            </main>
          </article>
        </section>
      </Router>

    </Fragment>
  )
}

export default App;