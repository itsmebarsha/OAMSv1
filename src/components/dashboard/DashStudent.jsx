/** @format */

// pages/index.js
import SubmitAssignment from "@/components/assignmentStudent/SubmitAssignment";
import ViewAssignmentList from "@/components/assignmentStudent/ViewAssignmentList";
import ViewSubmissionList from "@/components/assignmentStudent/ViewSubmissionList";
import { userStore } from "@/utlis/Store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/reducers/userSlice";
import axios from "axios";
const DashboardStudent = () => {
  const router = useRouter();
  const schoolStore = userStore();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    // Function to handle screen size changes
    const handleResize = () => {
      // Set isSidebarOpen to false if the screen size is small
      setIsSidebarOpen(window.innerWidth > 768); // You can adjust the threshold as needed
    };

    // Add event listener for screen size changes
    window.addEventListener("resize", handleResize);

    // Initial check for screen size
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      document.cookie =
        "token=; expires=Thu, 01 April 2024 00:00:00 UTC; path=/;";
      dispatch(logoutUser());
      router.push("/auth/signin"); // Redirect to the login page after logging out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const menuData = [
    {
      name: "Dashboard",
      icon: (
        <svg
          className="flex-shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      component: <DashboardAnalytics />,
    },

    {
      name: "Assignment",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          width="20"
          height="20">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      ),
      submenus: [
        {
          name: "Submit Assignment",
          component: (
            <div>
              <SubmitAssignment />
            </div>
          ),
        },
        {
          name: "View Assignment",
          component: (
            <div>
              <ViewAssignmentList />
            </div>
          ),
        },
        {
          name: "View Submission",
          component: (
            <div>
              <ViewSubmissionList />
            </div>
          ),
        }, //teacher
        // Add more submenus as needed
      ],
    },

    // Add more menu items as needed
  ];

  const toggleMenu = (menuName) => {
    setOpenMenu((prevMenu) => (prevMenu === menuName ? "" : menuName));
  };

  const developers = [
    {
      name: "Rojina Ale",
      role: "Documentation",
      photo: "/img/rojina.jpg",
    },
    {
      name: "Pooja Basoula",
      role: "System Designer",
      photo: "/img/poojaa.jpg",
    },
    {
      name: "Puja Dulal",
      role: "Frontend Developer",
      photo: "/img/puja.jpg",
    },
    {
      name: "Barsha Bhattarai",
      role: "Backend Developer",
      photo: "/img/barsha.jpg",
    },
    // Add more developers as needed
  ];
  return (
    <div className=" relative bg-gray-50 dark:bg-slate-900 ">
      <div className="sticky top-0  z-20 bg-white border-y px-4 sm:px-6 md:px-8  dark:bg-gray-800 dark:border-gray-700">
        <div
          className={` flex mb-2  ${isSidebarOpen ? " ml-52" : "ml-0 w-full"}`}>
          <div className=" py-3 flex">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              onClick={toggleSidebar}>
              <span className="sr-only">Toggle Navigation</span>
              <svg
                class="w-5 h-5"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <p className="text-sm font-semibold ml-2 text-gray-800 truncate dark:text-gray-400">
              School Assignment System
            </p>
          </div>
        </div>
      </div>

      <div
        id="application-sidebar"
        className={`hs-overlay transition-all duration-300  transform fixed top-0 start-0 bottom-0 z-[60]  bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700${
          isSidebarOpen ? "w-64" : " w-0"
        }`}>
        <div className=" flex pb-2 ">
          <div className=" text-center  w-full">
            <p className="flex justify-center w-full">
              <img src="/img/logo2.png" height={100} width={100} alt="" />
            </p>
            <p
              className="flex-none text-base font-semibold dark:text-white"
              href="#"
              aria-label="Brand">
              {schoolStore.userData.userEmail}
            </p>
            <p
              className="flex-none text-xs font-semibold dark:text-white"
              href="#"
              aria-label="Brand">
              {schoolStore.userData.schoolCode}
            </p>
            <p
              className="flex-none text-xs font-semibold dark:text-white"
              href="#"
              aria-label="Brand">
              Student
            </p>
          </div>
        </div>

        <nav className="hs-accordion-group px-6 mt-2 w-full flex flex-col flex-wrap">
          <ul className="space-y-1.5">
            {menuData.map((menu) => (
              <li
                key={menu.name}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedMenu(menu.name);
                  setSelectedComponent(menu.component);
                }}>
                <button
                  onClick={() => {
                    toggleMenu(menu.name);
                    setSelectedMenu(menu.name);
                  }}
                  type="button"
                  className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                    selectedMenu === menu.name ? "" : ""
                  }`}>
                  {menu.icon}
                  {menu.name}
                  {menu.submenus && (
                    <>
                      <svg
                        className={`hs-accordion-active:block ms-auto  w-4 h-4 ${
                          openMenu === menu.name ? "" : "hidden"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                      <svg
                        className={`hs-accordion-active:hidden ms-auto block w-4 h-4 ${
                          openMenu === menu.name ? "hidden" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </>
                  )}
                </button>

                {menu.submenus && (
                  <div
                    id={`${menu.name}-accordion-sub`}
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      openMenu === menu.name ? "" : "hidden"
                    }`}>
                    <ul className="hs-accordion-group ps-3 pt-2">
                      {menu.submenus.map((submenu) => (
                        <li key={submenu.name} className="hs-accordion">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMenu(submenu.name);
                              setSelectedComponent(submenu.component);
                            }}
                            className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            {submenu.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            <li className=" cursor-pointer" onClick={handleLogout}>
              <a
                className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                  selectedMenu === "dashboard" ? "" : ""
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  width="20"
                  height="20">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={` p-4 ${isSidebarOpen ? " ml-60" : "ml-0 w-full"}`}>
        {selectedComponent != null ? (
          <div>{selectedComponent}</div>
        ) : (
          <div>
            <div>
              <div className=" border p-4 rounded">
                <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">
                  Welcome to School Assignment Management System
                </h1>
                <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">
                  Features of our School Assignment Management System:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Efficient assignment tracking and management.</li>
                  <li>User-friendly interface for students and educators.</li>
                  <li>Secure access control for data protection.</li>
                  <li>
                    Real-time updates on assignment status and submissions.
                  </li>
                  <li>
                    Integrated notification system for important announcements.
                  </li>
                  <li>
                    Centralized storage of assignments and related documents.
                  </li>
                  <li>Customizable assignment categories and priorities.</li>
                </ul>
              </div>
            </div>
            <section className="mt-8 ">
              <div className=" border p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4 bg-gray-700 rounded text-white">
                  <h2 className="text-xl font-semibold p-2">Developed by:</h2>
                </div>
                <div className=" flex flex-wrap space-x-10">
                  {developers.map((developer, index) => (
                    <DeveloperCard key={index} {...developer} />
                  ))}
                </div>
              </div>

              {/* Repeat the above structure for each developer */}
              {/* You can add a total of 5 developers */}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardStudent;

const DeveloperCard = ({ name, role, photo }) => (
  <div className="flex items-center flex-col space-y-2">
    <div className="flex-shrink-0">
      <img
        className="w-24 h-24 rounded-full"
        src={photo}
        alt={`Developer ${name}`}
      />
    </div>
    <div className="w-full text-center">
      <p className="text-gray-800 dark:text-white font-medium">{name}</p>
      <p className="text-gray-500 dark:text-gray-400">{role}</p>
    </div>
  </div>
);

function DashboardAnalytics() {
  const schoolStore = userStore();
  const [stats, setStats] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const schoolCode = schoolStore.userData.schoolCode;
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get(
          `/api/student/analytics/getStats?schoolCode=${schoolCode}&studentEmail=${schoolStore.userData.userEmail}`
        );

        setStats(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    }

    fetchStats();
  }, []);

  const [teachersData, setTeachersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/student/analytics/getTeacher?schoolCode=${schoolCode}&studentEmail=${schoolStore.userData.userEmail}`
        );

        setTeachersData(response.data.teachersWithAssignmentCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // empty dependency array means this effect will run once when the component mounts

  const filteredData = teachersData.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof value === "number") {
        // Convert numbers to strings before searching
        return value.toString().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Total Students
              </p>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {stats.studentCount || "0"}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Total Course
              </p>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {stats.courseCount || "0"}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Total Subjects
              </p>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {stats.subjectCount || "0"}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Assignment Uploaded
              </p>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {stats.assignmentCount || "0"}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <ViewAssignmentList />
    </div>
  );
}
