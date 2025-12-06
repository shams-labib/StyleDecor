import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../Pages/Loader/Loading";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, loading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading />;
  }

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        // decoder data added

        const decorInfo = {
          name: data.name,
          email: data.email,
          address: data.address,
          experience: data.experience,
          role: "user",
          status: "",
        };

        axiosSecure
          .post(`/users?email=${data?.email}`, decorInfo)
          .then(() => {
            console.log("Data added success");
          })
          .catch((err) => {
            console.log(err);
          });

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userProfileUpdate = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfileUpdate)
            .then(() => {
              navigate(location?.state || "/");
            })
            .catch((err) => console.log(err));
        });

        navigate("/");
        Swal.fire({
          title: "Account Login Success!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4   transition-colors duration-300">
      <div className="card bg-white dark:bg-gray-800 w-full max-w-md shadow-xl rounded-2xl overflow-hidden transition-colors duration-300">
        <div className="card-body p-8">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Create an Account
          </h3>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            Login with email
          </p>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-4"
          >
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-200">
                  Name
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Your name"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Name is required
                </span>
              )}
            </div>
            {/* Experience */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-200">
                  Experience
                </span>
              </label>
              <input
                type="text"
                {...register("experience", { required: true })}
                className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Phone Number"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Experience is required
                </span>
              )}
            </div>
            {/* Address */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-200">
                  Address
                </span>
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Your address"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Address is required
                </span>
              )}
            </div>

            {/* Photo */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-200">
                  Photo
                </span>
              </label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered w-full outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              {errors.photo?.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Photo is required
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-200">
                  Email
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Email is required
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-200">
                  Password
                </span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                })}
                className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Password is required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 text-sm mt-1">
                  Password must include uppercase, lowercase, and number
                </span>
              )}
            </div>

            <div className="text-right">
              <a className="link link-hover text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                Forgot password?
              </a>
            </div>

            <button className="btn bg-primary w-full mt-2 hover:bg-primary-focus text-white font-semibold">
              Register
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              state={location?.state}
              to={"/login"}
              className="text-blue-500 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300"
            >
              Login Now
            </Link>
          </p>

          <div className="divider border-gray-300 dark:border-gray-600">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
