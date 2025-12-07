import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white dark:bg-gray-800"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={service.image || "/default-image.png"}
          alt={service.serviceName}
          className="w-full h-56 md:h-64 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {service.serviceName}
        </h2>

        {/* Category with animated icon */}
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          <Tag size={18} className="text-primary" />
          {service.category}
        </motion.p>

        {/* Price */}
        <p className="font-bold text-gray-800 dark:text-gray-200 mb-4">
          {service.cost} BDT / {service.unit}
        </p>

        {/* Button with animated right arrow */}
        <Link
          to={`/servicesDetails/${service._id}`}
          className="text-center bg-primary text-white px-5 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 hover:bg-blue-600"
        >
          View Details
          <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={20} />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
