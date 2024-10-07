import { useEffect, useMemo, useState } from "react";
import InvestorNavbar from "../../components/investor/InvestorNavbar";
import { baseUrl, socketUrl } from "../../Base";
import { useNavigate } from "react-router-dom";


const InvestorDashboard = () => {
  

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // retrieve userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // if no token or userId found then I can send redirect or error message
    if (!userId) {
      console.error("No userId found");
      return;
    }

    // call API to get user data
    const fetchUserData = async () => {
      const headers = {
        authorization: `${localStorage.getItem("token")}`,
      };
      try {
        const response = await fetch(`${baseUrl}/investor/${userId}`, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
        if (response.status === 401) {
          // alert("You are not authorized to view this page");
          // // redirect to login page
          // navigate("/login");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data); // set the user data into the local state
        setLoading(false); // stop loading after the data is fetched
      } catch (err) {
        console.error("Error when fetching user data", err);
        setLoading(false); // stop loading incase of error
      }
    };

    fetchUserData();
  }, [userId]);

  

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InvestorNavbar />
      <div>
        <h2>
          Hello, {userData?.user.firstName} {userData?.user.lastName}
        </h2>
      </div>
    </div>
  );
};

export default InvestorDashboard;
