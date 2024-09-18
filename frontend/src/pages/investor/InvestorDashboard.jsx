import { useEffect, useState } from "react";
import InvestorNavbar from "../../components/investor/InvestorNavbar";

const InvestorDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // retrieve token and userId from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // if no token or userId found then I can send redirect or error message
    if (!token || !userId) {
      console.error("No token or userId found");
      return;
    }

    // call API to get user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://samaraiz-node-backend.onrender.com/api/v1/investor/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

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
  }, []);

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InvestorNavbar userData={userData} />
      <div>
        <h2>Hello, {userData?.user.firstName} {userData?.user.lastName}</h2>
      </div>
    </div>
  );
};

export default InvestorDashboard;
