'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");
        const data = response.data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">User  List</h1>
      <table className="min-w-full border-collapse border text-white border-gray-300">
        <thead>
          <tr>
            <th className="border text-white border-gray-300 p-2">Name</th>
            <th className="border text-white border-gray-300 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border text-white border-gray-300 p-2">
                {user.name}
              </td>
              <td className="border text-white border-gray-300 p-2">
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}