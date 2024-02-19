"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { IoCloseSharp } from "react-icons/io5";
import { apiCalling } from "@/utils/api";

const EditModal = ({ userId, editModal, editToggle }) => {
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const getUserData = async () => {
    const userDetail = await apiCalling(
      `https://users-data-yzda.onrender.com/user/${userId}`,
      "GET"
    );
    console.log(userDetail);
    setFirstName(userDetail.firstName);
    setAge(userDetail.age);
    setEmail(userDetail.email);
    setGender(userDetail.gender);
    setPhone(userDetail.phone);
  };

  let obj = { firstName, age, email, gender, phone };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("ankush");
    const editPost = await apiCalling(
      `https://users-data-yzda.onrender.com/user/${userId}`,
      "PATCH",
      { "Content-type": "application/json" },
      JSON.stringify(obj)
    );
    editToggle();
    alert(`User with Id ${editPost.id} Edited successfully!`);
    console.log("data");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {editModal && (
        <div>
          <div className="fixed top-0 left-0 w-full h-scree bg-black z-100 "></div>

          <div className="border-container">
            <div className=" text-3xl flex justify-end">
              <span className="cursor-pointer" onClick={editToggle}>
                <IoCloseSharp />
              </span>
            </div>
            <h1 className="text-2xl font-bold text-blue-800 text-center">
              Edit User
            </h1>

            <form className="max-w-sm mx-auto">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium  text-blue-800">
                  Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-tag bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800 ">
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input-tag bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" input-tag bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="name@flowbite.com"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className=" input-tag bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-blue-800">
                  Phone
                </label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-tag bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
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
                  onClick={handleEdit}
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

export default EditModal;
