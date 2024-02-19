"use client";

import { apiCalling } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const AddPage = ({ addModal, addToggle }) => {
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const obj = { firstName, age, email, gender, phone };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ankush");
    const newUser = apiCalling(
      "https://users-data-yzda.onrender.com/user",
      "POST",
      { "Content-type": "application/json" },
      JSON.stringify(obj)
    );
    addToggle();
    alert("New user Added Successfully");
    console.log(newUser);
  };

  return (
    <div>
      {addModal && (
        <div>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black z-800 opacity-80"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "black",
              opacity: 0.5,
            }}
          ></div>

          <div className="border-container">
            <div className=" text-3xl flex justify-end">
              <span style={{ cursor: "pointer" }} onClick={addToggle}>
                <IoCloseSharp />
              </span>
            </div>
            <h1
              className="text-2xl font-bold text-center"
              style={{ color: "#2849b4" }}
            >
              Add New User
            </h1>

            <form className="max-w-sm mx-auto" style={{ height: "auto" }}>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 input-tag"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800 dark:text-white">
                  Age
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  input-tag"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block  mb-2 text-sm font-medium text-blue-800 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 input-tag border border-blue-800"
                  placeholder="name@flowbite.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800 dark:text-white">
                  Gender
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 input-tag"
                  required={true}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800 dark:text-white">
                  Phone
                </label>
                <input
                  type="number"
                  id="mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 input-tag"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="text-center">
                <button
                  className="px-4 py-1 text-white"
                  style={{
                    backgroundColor: "#2849b4",
                    padding: "0.4rem 1.5rem",
                    borderRadius: "10px",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPage;
