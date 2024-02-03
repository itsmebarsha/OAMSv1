/** @format */

import React, { useEffect, useReducer, useState } from "react";
import { FaCopy } from "react-icons/fa";
// import Addteacher from "../manageuser/Addteacher";
// import AddStudent from "../manageuser/AddStudent";
// import Addcourse from "../manageuser/Addcourse";
// import Addsubject from "../manageuser/Addsubject";
import TeacherList from "../users/TeacherList";
import StudentList from "../users/StudentList";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ViewAssignmentList from "../assignmentStudent/ViewAssignmentList";
import ViewSubmissionList from "../assignmentStudent/ViewSubmissionList";
import SubmitAssignment from "../assignmentStudent/SubmitAssignment";

function DashboardStudent() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const renderRightSideContent = () => {
    switch (selectedItem) {
      case "addAssignment":
        return <SubmitAssignment />;
      //  case "viewAssignment":
      //   return < />;
      //
      case "viewSubmission":
        return <ViewSubmissionList />;
      case "viewPastAssignment":
        return <ViewAssignmentList />;

      default:
        return null;
    }
  };

  const handleLogout = async () => {
    try {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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
                <img src="/img/logo1.png" alt="logo" />
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
              aria-expanded="false"
            >
              <i className="far fa-arrow-alt-circle-down"></i>
            </button>
            <button
              type="button"
              className="navbar-toggler sidebar-toggle-mobile"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className="header-main-menu collapse navbar-collapse"
            id="mobile-navbar"
          >
            <ul className="navbar-nav">
              <li className="navbar-item dropdown header-admin">
                <a
                  className="navbar-nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
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
                  <img src="img/logo1.png" alt="logo" />
                </a>
              </div>
            </div>
            <div className="sidebar-menu-content">
              <ul className="nav nav-sidebar-menu sidebar-toggle-view">
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
                          selectedItem === "viewPastAssignment"
                            ? "menu-active"
                            : ""
                        }`}
                        onClick={() => setSelectedItem("viewPastAssignment")}
                      >
                        <i className="fas fa-angle-right"></i>View Assignment
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "postAssignment" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("addAssignment")}
                      >
                        <i className="fas fa-angle-right"></i>Submit Assignment
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        href="#"
                        className={`nav-link ${
                          selectedItem === "viewSubmission" ? "menu-active" : ""
                        }`}
                        onClick={() => setSelectedItem("viewSubmission")}
                      >
                        <i className="fas fa-angle-right"></i>View Submission
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

export default DashboardStudent;
