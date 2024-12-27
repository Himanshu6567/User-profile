import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleGetuserData = () => {
    let x = Math.floor(Math.random() * 9000 + 1);
    const api = `https://randomuser.me/api/?page=${x}&results=1&seed=abc`;

    setLoadingImage(true);
    axios
      .get(api)
      .then((result) => {
        setUserProfile(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetuserData();
  }, []);

  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="space-y-6">
        <div
          onClick={handleGetuserData}
          className="flex items-center justify-end cursor-pointer"
        >
          <IoReload className="text-white text-3xl transition-transform transform hover:rotate-180 duration-300" />
        </div>
        {userProfile.map((user, i) => {
          return (
            <div
              key={i}
              className=" bg-gradient-to-br from-white via-gray-400 to-white border rounded-xl shadow-xl p-6 max-w-md flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0"
            >
              <div className="relative  flex justify-end items-end w-32 bg-red-5 h-32">
                {loadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-indigo-500 font-semibold">Loading...</p>
                  </div>
                )}
                <img
                  src={user.picture.large}
                  alt={user.name.first}
                  className={`w-28 h-28  border-2 border-indigo-500 transition-opacity duration-300 ${
                    loadingImage ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="text-center bg-green-0 md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{`${user.name.first} ${user.name.last}`}</h1>
                <p className="text-gray-600 capitalize">{`Gender: ${user.gender}`}</p>
                <p className="text-gray-600">{`Phone: ${user.phone}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
