'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddUser () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter(); // Initialize the router


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/users", { name, email });
      setSuccess("User  added successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      setError("Failed to add user. Please try again.");
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
        // Redirect to home page after 5 seconds
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error, success, router]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex border border-slate-200 rounded-xl w-[600px]"
        aria-label="simple-form"
      >
        <div className="flex-1 gap-2 p-2 flex">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-transparent outline-none border rounded-lg !text-black"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-transparent outline-none border rounded-lg !text-black"
            required
          />
        </div>
        <button type="submit" className="flex-shrink-0 p-3 font-bold text-white bg-blue-500 rounded-xl">
          Add User
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}