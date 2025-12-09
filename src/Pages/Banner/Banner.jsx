import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  ShoppingBasket,
  CircleDollarSign,
} from "lucide-react";
import { useState } from "react";
import Loading from "../Loader/Loading";

const iconAnim = {
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: { type: "spring", stiffness: 300 },
  },
};

const categoryIcons = {
  home: <User className="w-6 h-6 text-white" />,
  wedding: <User className="w-6 h-6 text-white" />,
  office: <User className="w-6 h-6 text-white" />,
  seminar: <User className="w-6 h-6 text-white" />,
};

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banner");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleBookSubmit = (data) => {
    const bookingInfo = {
      serviceName: selectedService.serviceName,
      price: selectedService.cost,
      userName: user?.displayName,
      userEmail: user?.email,
      date: data.date,
      bookingsDate: new Date(),
      location: data.location,
      category: selectedService.category,
      image: selectedService.image,
    };

    axiosSecure.post("/bookings", bookingInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          text: `Your booking for ${selectedService.serviceName} is confirmed.`,
        });
      }
    });

    setOpenModal(false);
    reset();
  };

  const handleBook = (service) => {
    if (user) {
      setSelectedService(service);
      setOpenModal(true);
    } else {
      Swal.fire({ icon: "error", title: "Please login first" }).then(() => {
        window.location.href = "/login";
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4500}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
        stopOnHover={false}
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full">
            <motion.img
              src={banner.image}
              alt={banner.serviceName}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="w-full h-[270px] sm:h-[350px] md:h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-2xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-xl"
              >
                {banner.serviceName}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex items-center gap-4 text-white text-lg font-semibold"
              >
                <div className="flex items-center gap-1">★ {banner.rating}</div>
                <div className="flex items-center gap-2">
                  {categoryIcons[banner.category]}
                  <span className="capitalize">{banner.category}</span>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-white cursor-pointer rounded-lg shadow-xl font-semibold hover:bg-primary/90 transition"
                onClick={() => handleBook(banner)}
              >
                Book Now
              </motion.button>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Modal */}
      {openModal && selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="modal modal-open"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="modal-box dark:bg-gray-800 rounded-xl shadow-xl"
          >
            <h3 className="font-bold text-2xl mb-4 text-center">
              Book This Service
            </h3>

            <form
              onSubmit={handleSubmit(handleBookSubmit)}
              className="space-y-4"
            >
              {[
                {
                  label: "Your Name",
                  value: user?.displayName,
                  icon: <User size={18} />,
                },
                {
                  label: "Your Email",
                  value: user?.email,
                  icon: <Mail size={18} />,
                },
                {
                  label: "Service Name",
                  value: selectedService?.serviceName,
                  icon: <ShoppingBasket size={18} />,
                },
                {
                  label: "Cost",
                  value: selectedService?.cost,
                  icon: <CircleDollarSign size={18} />,
                },
              ].map((field, i) => (
                <div key={i} className="form-control group">
                  <label className="label font-semibold">{field.label}</label>
                  <div className="input input-bordered flex items-center gap-2 group-hover:shadow-md transition-all duration-200">
                    <motion.div whileHover="hover" variants={iconAnim}>
                      {field.icon}
                    </motion.div>
                    <input
                      type="text"
                      value={field.value}
                      disabled
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
              ))}

              {/* Booking Date */}
              <div className="form-control group">
                <label className="label font-semibold">Booking Date</label>
                <div className="input input-bordered flex items-center gap-2 group-hover:shadow-md">
                  <motion.div variants={iconAnim} whileHover="hover">
                    <Calendar size={18} />
                  </motion.div>
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                {errors.date && (
                  <span className="text-red-500 text-sm">
                    Booking date is required
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="form-control group">
                <label className="label font-semibold">Location</label>
                <div className="input input-bordered flex items-center gap-2 group-hover:shadow-md">
                  <motion.div variants={iconAnim} whileHover="hover">
                    <MapPin size={18} />
                  </motion.div>
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

              <motion.button
                whileHover={{ scale: 1.03 }}
                className="btn btn-primary w-full shadow-lg"
                type="submit"
              >
                Confirm Booking
              </motion.button>
            </form>

            <div className="modal-action">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setOpenModal(false)}
                className="btn btn-outline btn-primary"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Banner;
