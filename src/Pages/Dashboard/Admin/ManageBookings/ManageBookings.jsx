import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["bookings", "planning-phase"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });

  const { data: riders = [], refetch: ridersRefetch } = useQuery({
    queryKey: ["riders", "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?status=approved&role=decorator`
      );
      return res.data;
    },
  });

  const riderModalRef = useRef();

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = async (rider) => {
    const riderAssignInfo = {
      riderEmail: rider.email,
      riderName: rider.name,
      trackingId: selectedParcel.trackingId,
      image: selectedParcel.image,
      cost: selectedParcel.price,
      location: selectedParcel.location,
      category: selectedParcel.category,
    };

    try {
      const res = await axiosSecure.patch(
        `/bookings/${selectedParcel._id}/role`,
        riderAssignInfo
      );

      // Backend e decoratorsCollection.insertOne return kore
      if (res.data?.acknowledged) {
        riderModalRef.current.close(); // modal close
        setSelectedParcel(null); // selected item reset
        parcelsRefetch(); // UI refresh
        ridersRefetch();

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Decorator has been assigned!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Assignment failed:", error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Assignment failed!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <h1>Assign Riders {parcels.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.serviceName}</td>
                <td>{parcel.price}</td>
                <td>{parcel.date}</td>
                <td>{parcel.location}</td>
                <td className="text-center">
                  {parcel.deliveryStatus === "planning-phase" &&
                  parcel.paymentStatus === "paid" ? (
                    <button
                      onClick={() => openAssignRiderModal(parcel)}
                      className="px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                      Find Decorator
                    </button>
                  ) : parcel.deliveryStatus === "Materials Prepared" ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium text-sm">
                      Assigned
                    </span>
                  ) : (
                    <button
                      className="px-4 py-2 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Not Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        id="my_modal_5"
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders : {riders.length}!</h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <th>{index + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn bg-green-400 text-white"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageBookings;
