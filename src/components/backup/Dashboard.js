/** @format */

import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import Addteacher from "../manageuser/Addteacher";
import AddStudent from "../manageuser/AddStudent";
import Addcourse from "../manageuser/Addcourse";
import Addsubject from "../manageuser/Addsubject";
import TeacherList from "../users/TeacherList";
import StudentList from "../users/StudentList";
import Addassignment from "../assignmentTeacher/Addassignment";
import ViewAssignmentList from "../assignmentTeacher/ViewAssignmentList";
import ViewSubmissionList from "../assignmentTeacher/ViewSubmissionList";

import { useRouter } from "next/router"; // Import the useRouter hook
import CredentialList from "../loginCredential/CredentialList";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/reducers/userSlice";
import Image from "next/image";

function Dashboard() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const dispatch = useDispatch();
  const renderRightSideContent = () => {
    switch (selectedItem) {
      // case "admin":
      // return <Admin />
      case "addTeacher":
        return <Addteacher />;

      case "addStudent":
        return <AddStudent />;
      case "addCourse":
        return <Addcourse />;
      case "addSubject":
        return <Addsubject />;
      case "allTeacher":
        return <TeacherList />;

      case "studentList":
        return <StudentList />;
      case "teacherList":
        return <TeacherList />;
      case "credentialList":
        return <CredentialList />;

      case "addAssignment":
        return <Addassignment />;
      //  case "viewAssignment":
      //   return < />;
      //
      case "viewSubmission":
        return <ViewSubmissionList />;
      case "viewPastAssignment":
        return <ViewAssignmentList />;
      case "postAssignment":
        return <Addassignment />;
      default:
        return null;
    }
  };

  const handleLogout = async () => {
    try {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(logoutUser());
      router.push("/auth/signin"); // Redirect to the login page after logging out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <div className="navbar navbar-expand-md header-menu-one bg-light">
          <div className="nav-bar-header-one">
            <div className="header-logo">
              <a href="index.html">
                {/* <img src="/img/logo1.png" alt="logo" /> */}
                {/* <h6>OAMS</h6> */}
                <Image src="/img/logo2.png" height={75} width={75} />
              </a>
            </div>
            <div className="toggle-button sidebar-toggle">
              <button type="button" className="item-link">
                <span className="btn-icon-wrap">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
          <div className="d-md-none mobile-nav-bar">
            <button
              className="navbar-toggler pulse-animation"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-navbar"
              aria-expanded="false">
              <i className="far fa-arrow-alt-circle-down"></i>
            </button>
            <button
              type="button"
              className="navbar-toggler sidebar-toggle-mobile">
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className="header-main-menu collapse navbar-collapse"
            id="mobile-navbar">
            <ul className="navbar-nav">
              <li className="navbar-item header-search-bar"></li>
            </ul>
            <ul className="navbar-nav">
              <li className="navbar-item dropdown header-admin">
                <a
                  className="navbar-nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false">
                  <div className="admin-title">
                    <h5 className="item-title">Admin</h5>
                    <span>Admin</span>
                  </div>
                  <div className="admin-img">
                    <img src="img/figure/admin.jpg" alt="Admin" />
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="item-header">
                    <h6 className="item-title">Steven Zone</h6>
                  </div>
                  <div className="item-content">
                    <ul className="settings-list">
                      <li>
                        <a href="#">
                          <i className="flaticon-user"></i>My Profile
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-list"></i>Task
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-chat-comment-oval-speech-bubble-with-text-lines"></i>
                          Message
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-gear-loading"></i>Account
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="" onClick={handleLogout}>
                          <i className="flaticon-turn-off"></i>Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-page-one">
          <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
            <div className="mobile-sidebar-header d-md-none">
              <div className="header-logo">
                <a href="index.html">
                  {/* <img src="img/logo.png" alt="logo" /> */}
                </a>
              </div>
            </div>
            <div className="sidebar-menu-content">
              <ul className="nav nav-sidebar-menu sidebar-toggle-view">
                <li className="nav-item sidebar-nav-item">
                  <a href="#" className="nav-link">
                    <i className="flaticon-dashboard"></i>
                    <span>User Management</span>
                  </a>
                  <ul className="nav sub-group-menu">
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "addTeacher" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("addTeacher")}>
                        <i className="fas fa-angle-right"></i> Add Teacher
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "addStudent" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("addStudent")}>
                        <i className="fas fa-angle-right"></i>Add Student
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "addCourse" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("addCourse")}>
                        <i className="fas fa-angle-right"></i>Add Course
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "addSubject" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("addSubject")}>
                        <i className="fas fa-angle-right"></i> Add Subject
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item sidebar-nav-item">
                  <a href="#" className="nav-link">
                    <i className="flaticon-classmates"></i>
                    <span>Users</span>
                  </a>
                  <ul className="nav sub-group-menu">
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "studentList" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("studentList")}>
                        <i className="fas fa-angle-right"></i>Student List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "teacherList" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("teacherList")}>
                        <i className="fas fa-angle-right"></i>Teacher List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "teacherList" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("credentialList")}>
                        <i className="fas fa-angle-right"></i>Credential List
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item sidebar-nav-item">
                  <a href="#" className="nav-link">
                    <i className="flaticon-multiple-users-silhouette"></i>
                    <span>Teachers</span>
                  </a>
                  <ul className="nav sub-group-menu">
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "allTeacher" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("allTeacher")}>
                        <i className="fas fa-angle-right"></i>All Teachers
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item sidebar-nav-item">
                  <a href="#" className="nav-link">
                    <FaCopy style={{ color: "#ff9d37" }} />
                    <span style={{ marginLeft: "10px" }}>Assignment</span>
                  </a>
                  <ul className="nav sub-group-menu">
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "addAssignment" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("addAssignment")}>
                        <i className="fas fa-angle-right"></i>Add Assignment
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "postAssignment" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("postAssignment")}>
                        <i className="fas fa-angle-right"></i>Post Assignment
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "viewSubmission" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("viewSubmission")}>
                        <i className="fas fa-angle-right"></i>View Submission
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "viewPastAssignment"
                            ? "menu-active"
                            : ""
                        }`}
                        onClick={() => setSelectedItem("viewPastAssignment")}>
                        <i className="fas fa-angle-right"></i>View Past
                        Assignment
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item sidebar-nav-item">
                  <a href="#" className="nav-link" onClick={handleLogout}>
                    <i className="flaticon-classmates"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="dashboard-content-one">{renderRightSideContent()}</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
