import React, { useState } from "react";
import { Calendar, MapPin, Mail, User } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";

const ServiceDetails = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const handleBookSubmit = (data) => {
    const bookingInfo = {
      serviceName: service.serviceName,
      price: service.cost,
      userName: user?.displayName,
      userEmail: user?.email,
      date: new Date(),
      location: data.location,
      category: service.category,
      image: service.image,
    };

    console.log(bookingInfo);

    axiosSecure.post("/bookings", bookingInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          text: `Your booking for ${service.serviceName} is confirmed.`,
        });
      }
    });

    setOpenModal(false);
    reset(); // clear form
  };

  const handleBook = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
      Swal.fire({
        icon: "error",
        title: "Please login first",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col justify-center items-center">
      {/* Card */}
      <div className="card lg:card-side bg-white dark:bg-gray-900 shadow-xl p-6">
        {/* Image */}
        <figure className="w-full lg:w-1/2">
          <img
            src={service?.image}
            alt={service?.serviceName}
            className="rounded-xl w-full object-cover h-80 lg:h-full"
          />
        </figure>

        {/* Content */}
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">
            {service?.serviceName}
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {service?.description}
          </p>

          <div className="mt-4 space-y-1">
            <p className="font-semibold">
              Category:{" "}
              <span className="text-blue-600">{service?.category}</span>
            </p>

            <p className="font-semibold text-xl text-green-600">
              Price: {service?.cost} BDT / {service?.unit}
            </p>
          </div>

          <div className="card-actions mt-6">
            <button onClick={handleBook} className="btn btn-primary px-6">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box dark:bg-gray-800">
            <h3 className="font-bold text-2xl mb-4">Book This Service</h3>

            {/* Booking Form using React Hook Form */}
            <form
              onSubmit={handleSubmit(handleBookSubmit)}
              className="space-y-4"
            >
              {/* User Name */}
              <div className="form-control">
                <label className="label font-semibold">Your Name</label>
                <div className="input input-bordered flex items-center gap-2">
                  <User size={18} />
                  <input
                    type="text"
                    value={user?.displayName}
                    disabled
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* User Email */}
              <div className="form-control">
                <label className="label font-semibold">Your Email</label>
                <div className="input input-bordered flex items-center gap-2">
                  <Mail size={18} />
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Booking Date */}
              <div className="form-control">
                <label className="label font-semibold">Booking Date</label>
                <div className="input input-bordered flex items-center gap-2">
                  <Calendar size={18} />
                  <input
                    type="date"
                    {...register("bookingDate", { required: true })}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                {errors.bookingDate && (
                  <span className="text-red-500 text-sm">
                    Booking date is required
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label font-semibold">Location</label>
                <div className="input input-bordered flex items-center gap-2">
                  <MapPin size={18} />
                  <input
                    type="text"
                    placeholder="Event location"
                    {...register("location", { required: true })}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                {errors.location && (
                  <span className="text-red-500 text-sm">
                    Location is required
                  </span>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-full">
                Confirm Booking
              </button>
            </form>

            <div className="modal-action">
              <button
                onClick={() => setOpenModal(false)}
                className="btn btn-outline btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
