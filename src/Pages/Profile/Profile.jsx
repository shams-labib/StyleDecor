import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ProfileCard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user full profile
  const { data: profileData = {} } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`users?email=${user.email}`);
      return res.data[0] || {};
    },
  });

  // Final Profile Merge
  const profile = {
    name: user?.displayName || profileData.name,
    email: user?.email || profileData.email,
    address: profileData.address || "Not set",
    experience: profileData.experience || 0,
    role: profileData.role || "user",
    status: profileData.status || "offline",
    createdAt: profileData.createdAt || new Date(),
    photoURL:
      user?.photoURL ||
      profileData.photoURL ||
      "https://via.placeholder.com/150",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-all">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Top header gradient */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
            <img
              src={profile.photoURL}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
        </div>

        {/* Name & Role */}
        <div className="text-center mt-20 px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {profile.name}
          </h2>

          <p className="text-gray-500 dark:text-gray-300 mt-1">
            {profile.email}
          </p>

          <span className="mt-3 inline-block bg-violet-600 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold shadow">
            {profile.role}
          </span>
        </div>

        {/* Additional Info */}
        <div className="px-8 py-6 text-gray-700 dark:text-gray-300 space-y-3">
          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Status</span>
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold ${
                profile.status === "approved"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {profile.status}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 pt-2">
            <span className="font-semibold">Experience</span>
            <span>{profile.experience} Years</span>
          </div>

          <div className="flex justify-between border-b pb-3 pt-2">
            <span className="font-semibold">Address</span>
            <span>{profile.address}</span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="font-semibold">Joined</span>
            <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="px-8 pb-6 space-y-3">
          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl shadow transition transform hover:scale-[1.02]">
            Edit Profile
          </button>

          <Link
            to="/"
            className="w-full block text-center border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition transform hover:scale-[1.02]"
          >
            <span className="flex justify-center items-center gap-2">
              <FaArrowLeft /> Go Back
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
