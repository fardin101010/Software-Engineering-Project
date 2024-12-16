import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Request from "./Request";
import Navbar from "../../Navber/Navber";

const BidRequest = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/bookings")
            .then((res) => res.json())
            .then((data) => {
                const filteredData = data.filter((booking) => booking.buyerEmail === user.email);
                setBookings(filteredData);
            });
    }, [user.email]);

    const handleAccept = (bookingId) => {
        fetch(`http://localhost:5000/bookings/${bookingId}/accept`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Accepted") {
                    const updatedBookings = bookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, Status: "Accepted" } : booking
                    );
                    setBookings(updatedBookings);
                }
            });
    };

    const handleReject = (bookingId) => {
        fetch(`http://localhost:5000/bookings/${bookingId}/reject`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Rejected") {
                    const updatedBookings = bookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, Status: "Cancelled" } : booking
                    );
                    setBookings(updatedBookings);
                }
            });
    };

    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-2xl mt-4 font-bold text-center text-orange-400">
                Total Unique Buyers: {bookings.length}
            </h1>

            <div className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Job title</th>
                            <th>Email</th>
                            <th>Deadline</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {bookings.map((booking) => (
                            <Request
                                key={booking._id}
                                booking={booking}
                                handleAccept={() => handleAccept(booking._id)} // Pass booking ID to handleAccept
                                handleReject={() => handleReject(booking._id)} // Pass booking ID to handleReject
                            />
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default BidRequest;




