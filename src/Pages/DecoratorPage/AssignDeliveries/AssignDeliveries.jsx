import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AssignDeliveries = () => {
  const [acceptedIds, setAcceptedIds] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["decorators", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?decoratorEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
    };

    let massage = `Parcel status is updated with ${status
      .split("-")
      .join(" ")}`;

    axiosSecure
      .patch(`/bookings/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            showConfirmButton: false,
            timer: 2000,
            text: massage,
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-6">
        Parcels Pickup : {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra table-hover w-full border border-gray-200 dark:border-gray-700">
          {/* Table Head */}
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Tracking ID</th>
              <th>Category</th>
              <th>Location</th>
              <th>Cost (BDT)</th>
              <th>Status / Confirm</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <th>{index + 1}</th>

                {/* Parcel Info with Image */}
                <td className="flex items-center gap-2">
                  <img
                    src={parcel.image || "/default-image.png"}
                    alt={parcel.parcelName}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                  <span>{parcel.decoratorName}</span>
                </td>

                {/* Tracking ID */}
                <td className="font-mono text-sm">{parcel.trackingId}</td>

                {/* Category */}
                <td>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {parcel.category}
                  </span>
                </td>

                {/* Location */}
                <td>{parcel.location}</td>

                {/* Cost */}
                <td className="font-semibold">
                  {/* {parcel.cost.toLocaleString()} */}
                  {parcel.price}
                </td>

                {/* Status / Confirm */}
                <td>
                  {parcel.deliveryStatus === "materials-prepared" ? (
                    <>
                      {" "}
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(
                            parcel,
                            "on-the-way-to-venue"
                          )
                        }
                        className="btn btn-primary "
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning  ms-2">Reject</button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>

                {/* Actions */}
                <td>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "setup-in-progress")
                    }
                    className="btn btn-primary "
                  >
                    Mark as process
                  </button>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "Completed")
                    }
                    className="btn btn-primary  mx-2"
                  >
                    Mark as completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignDeliveries;
