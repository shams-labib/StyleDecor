import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TopCard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  // Top 8 services
  const topServices = services.slice(0, 8);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10 flex items-center justify-center gap-3">
          <motion.span
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary"
          >
            <Sparkles size={32} />
          </motion.span>
          Top Services
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topServices.length > 0 ? (
            topServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300 col-span-full">
              No top services available.
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          to="/services"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default TopCard;
