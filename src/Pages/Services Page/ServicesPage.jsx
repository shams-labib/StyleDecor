import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loader/Loading";

const ServicesPage = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState([0, 100000]);

  // Filter logic
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.serviceName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;
    const matchesBudget =
      Number(service.cost) >= budgetFilter[0] &&
      Number(service.cost) <= budgetFilter[1];
    return matchesSearch && matchesCategory && matchesBudget;
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-500">Error loading services.</p>
    );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center ">
        Our Services
      </h1>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search service..."
          className="border p-2 rounded flex-1 min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded min-w-[150px]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="office">Office</option>
        </select>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="range"
            min="0"
            max="100000"
            step="5000"
            value={budgetFilter[1]}
            className="w-full sm:w-48"
            onChange={(e) =>
              setBudgetFilter([budgetFilter[0], parseInt(e.target.value)])
            }
          />
          <span className="text-sm">Max Budget: {budgetFilter[1]} BDT</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col"
          >
            <img
              src={service.image || "/default-image.png"}
              alt={service.serviceName}
              className="w-full h-48 md:h-56 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2">
                {service.serviceName}
              </h2>
              <p className="text-gray-600 mb-2 flex-1">{service.description}</p>
              <p className="font-bold mb-2">
                {service.cost} BDT / {service.unit}
              </p>
              <Link
                to={`/servicesDetails/${service._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-auto"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
