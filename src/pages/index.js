/** @format */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/reducers/userSlice";
import { userStore } from "@/utlis/Store";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const schoolStore = userStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token"); // Extract the token from the cookie

        if (!token) {
          // If the token is not present, redirect to the login page
          router.push("/auth/signin");
          return;
        }

        const decodedToken = jwt_decode(token); // Decode the token
        const currentTime = Date.now() / 1000;

        // Verify if the token is not expired
        if (decodedToken.exp < currentTime) {
          // If the token is expired, redirect to the login page
          router.push("/auth/signin");
          return;
        }

        // Fetch the user data from the protected API route
        const response = await axios.get("/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request header
            // Cookie: `inpro_session=${inproSession}`,
          },
        });

        setUser(response.data);

        console.log("Hello" + response.data);

        schoolStore.setData({
          userEmail: response.data.email,
          userRole: response.data.role,
          schoolCode: response.data.schoolCode,
        });
        setLoading(false);
      } catch (error) {
        // If the API call fails, redirect to the login page
        router.push("/auth/signin");
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(user.email);

  const userRole = user.role; // Assuming you have userRole property in the user object
  const dispatch = useDispatch();
  dispatch(
    loginUser({
      role: userRole, // Replace with the actual role
      userDetail: user, // Replace with the actual user data
    })
  );
  if (userRole === "admin") {
    // If the user is logged in as admin, redirect to the admin home page
    router.push("/dash/admin");
    return null;
  } else if (userRole === "student") {
    // If the user is logged in as a customer, redirect to the customer home page
    router.push("/dash/student");
    return null;
  } else if (userRole === "teacher") {
    // If the user is logged in as a customer, redirect to the customer home page
    router.push("/dash/teacher");
    return null;
  } else {
    // Handle any other roles or unexpected scenarios here, if necessary
    // For example, redirect to a 404 page or a generic home page
    router.push("/404");
    return null;
  }

  return (
    <div>
      <h1>Hello, {user.name}!</h1>
      <p>This is a protected page.</p>
    </div>
  );
};

export default Home;
