import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Bids from "./Bids";
import Navbar from "../../Navber/Navber";


const MyBids = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setBookings(data);
            });
    }, [url]);




    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1 className="text-2xl mt-4 font-bold text-center text-orange-400">Total Bookings: {bookings.length}</h1>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Job Title</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <Bids key={booking._id} booking={booking} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBids;






