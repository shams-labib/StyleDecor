import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const CreateDecoratorForm = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const decorInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      experience: data.experience,
      role: data.role,
    };

    axiosSecure
      .post(`/users?email=${data?.email}`, decorInfo)
      .then(() => {
        console.log("data added success");
      })
      .catch((err) => {
        console.log(err);
      });

    reset();
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow p-6 rounded-xl max-w-4xl mx-auto md:my-10">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
        Create New Decorator
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter decorator name"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* experience */}
          <div>
            <label className="block mb-1 font-medium">Experience</label>
            <input
              {...register("experience", { required: true })}
              type="text"
              placeholder="Decorator experience"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              {...register("role", { required: true })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select role</option>
              <option value="decorator">Decorator</option>
              <option value="user">Disable</option>
            </select>
          </div>

          {/* Address → Full width */}
          <div className="w-full md:col-span-2">
            <label className="block mb-1 font-medium">Address</label>
            <input
              {...register("address", { required: true })}
              type="text"
              placeholder="Your Address"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Bio / Description (full width on desktop also) */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Bio / Description</label>
            <textarea
              {...register("bio")}
              rows="4"
              placeholder="Short bio about the decorator..."
              className="w-full border rounded-lg px-3 py-2"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-primary cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Create Decorator
        </button>
      </form>
    </div>
  );
};

export default CreateDecoratorForm;
