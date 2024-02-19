"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { apiCalling } from "@/utils/api";
import AddPage from "@/component/newmodal/AddPage";
import EditModal from "@/component/edit modal/EditModal";
import { ClipLoader } from "react-spinners";

const Users = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const addToggle = () => setAddModal(!addModal);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [count, setCount] = useState(0);

  const getData = async () => {
    const check = await apiCalling(
      "https://users-data-yzda.onrender.com/user",
      "GET"
    );
    try {
      setData(check);
      setLoader(true);
    } catch (err) {
      console.log(err);
    }
  };

  const editToggle = (id) => {
    setEditModal(!editModal);
    setUserId(id);
  };

  const handleDelete = async (id) => {
    const Delete = await apiCalling(
      `https://users-data-yzda.onrender.com/user/${id}`,
      "DELETE",
      { "Content-type": "application/json" }
    );
    alert(`User with Id ${id} deleted successfully!`);
    console.log(Delete);
    setCount(count + 1);
  };

  useEffect(() => {
    getData();
  }, [data]);
  return (
    <div>
      <nav className="w-full h-auto bg-gradient-to-r from-blue-800 to-blue-500 py-3 flex">
        <div className="w-3/5 h-full sm:pl-10 pl-3">
          <h1 className="text-white sm:text-3xl text-2xl font-bold">
            Assignment-2
          </h1>
        </div>

        <div className="w-2/5 text-white h-auto pr-5 flex justify-end">
          <div className="w-24 h-full flex items-center justify-around">
            <p>Search </p>
            <p>
              <FaSearch />
            </p>
          </div>
        </div>
      </nav>

      <div className="flex justify-between">
        <div className="lg:block hidden w-1/6 h-screen bg-white px-2 custom-box-shadow">
          <div className="w-full h-auto relative">
            <button
              className="w-full px-6 py-2 absolute top-24 text-white bg-gradient-to-r from-blue-800 to-blue-200  rounded-sm box-border hover:text-blue-800 font-semibold"
              onClick={addToggle}
            >
              Add User
            </button>
          </div>
        </div>

        {/* dashboard data */}
        <div className="lg:w-5/6 w-full">
          <div className="w-full h-auto mt-10 items-center flex justify-around  flex-wrap m-auto">
            <div className="w-60 h-32 mb-6 mr-5 p-5 text-center rounded-md bg-gradient-to-r from-blue-800 to-blue-200 relative">
              <h2 className="font-bold text-xl text-white mb-3">Total Users</h2>
              <h1 className="font-bold text-3xl text-white">
                {!loader ? (
                  <div className="absolute left-1/2 -translate-x-1/2 top-3/5">
                    <ClipLoader color="white" />
                  </div>
                ) : (
                  234
                )}
              </h1>
            </div>
            <div className="w-60 h-32 mb-6 mr-5 rounded-md text-center p-5 bg-gradient-to-r from-blue-800 to-blue-200">
              <h2 className="font-bold text-xl text-white mb-3">
                Active Users
              </h2>
              <h1 className="font-bold text-3xl text-white">
                {!loader ? (
                  <ClipLoader color="white" />
                ) : data.length < 10 ? (
                  "0" + data.length
                ) : (
                  data.length
                )}
              </h1>
            </div>
            <div className="w-60 h-32 mb-6 mr-5 p-5 rounded-md bg-gradient-to-r from-blue-800 to-blue-200 text-center">
              <h2 className="font-bold text-xl text-white mb-3">
                Deleted Users
              </h2>
              <h1 className="font-bold text-3xl text-white">
                {!loader ? (
                  <ClipLoader color="white" />
                ) : count < 10 ? (
                  "0" + count
                ) : (
                  count
                )}
                {}
              </h1>
            </div>
          </div>

          {addModal ? (
            <AddPage addModal={addModal} addToggle={addToggle} />
          ) : null}
          {editModal ? (
            <EditModal
              userId={userId}
              editModal={editModal}
              editToggle={editToggle}
            />
          ) : null}

          <div className=" w-11/12 text-center m-auto mt-6 flex justify-around">
            <h1 className="sm:text-3xl text-3xl text-blue-800 font-semibold">
              All Users
            </h1>
            <button
              className="bg-blue-800 px-6 py-2 text-white rounded-md lg:hidden block"
              onClick={addToggle}
            >
              Add User
            </button>
          </div>

          <div className="flex overflow-x-auto whitespace-nowrap mt-10">
            {!loader ? (
              <div className="absolute left-1/2 -translate-x-1/2">
                <RotatingLines
                  visible={true}
                  height="96"
                  width="96"
                  color={"failure"}
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{ color: "blue" }}
                  wrapperClass="dashboard_custom_spinner"
                />
              </div>
            ) : (
              <table className=" m-auto ">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-4 px-8  text-left">S no.</th>
                    <th className="py-4 px-8  text-left">Name</th>
                    <th className="py-4 px-8  text-left">Age</th>
                    <th className="py-4 px-8  text-left">Email</th>
                    <th className="py-4 px-8  text-left">Gender</th>
                    <th className="py-4 px-8  text-left">Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((ele, index) => (
                    <tr key={ele.id} className="border-b border-gray-300">
                      <td className="py-4 px-8  text-left">{index + 1}</td>
                      <td className="py-4 px-8 text-left">{ele.firstName}</td>
                      <td className="py-4 px-8 text-left">{ele.age}</td>
                      <td className="py-4 px-8 text-left">{ele.email}</td>
                      <td className="py-4 px-8 text-left">{ele.gender}</td>
                      <td className="py-4 px-8 text-left">{ele.phone}</td>
                      <td className="pl-5 pr-3">
                        <button
                          onClick={() => handleDelete(ele.id)}
                          className="text-red-600 text-2xl"
                        >
                          <MdDelete />
                        </button>
                      </td>
                      <td className=" px-3">
                        <button onClick={() => editToggle(ele.id)}>
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
