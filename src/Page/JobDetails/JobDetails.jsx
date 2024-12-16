import { useLoaderData } from "react-router-dom";
import Navbar from "../../Navber/Navber";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const JobDetails = () => {
    const { user } = useContext(AuthContext);
    const jobs = useLoaderData();
    const { title, email, dateline, posting, minPrice, maximum, description } = jobs;




    const handleBookingJobs = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const date = form.date.value;
        const userEmail = user?.email;
        const buyerEmail = form.buyer.value;
        const price = form.price.value;
        const details = form.details.value;

        const booking = {
            Name: name,
            email: userEmail,
            date,
            JobTitle: title,
            buyerEmail: buyerEmail,
            Price: price,
            details,
        };

        console.log(booking);

        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Bid on the project successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            });
    }



    return (
        <div className="">
            <Navbar></Navbar>
            <div>
                <div className="border border-orange-500 h-[400px] w-[500px] mx-auto mt-6 rounded-lg px-2 lg:px-6 py-6 space-y-3">

                    <h1><span className="text-xl font-bold">Job Title:</span>  <span className="text-xl font-bold text-amber-700">{title}</span></h1>
                    <h2 className="card-title "><span>Posting Email:</span>{email}<span></span></h2>
                    <p className="text-justify">{description}</p>
                    <p> <span>DateLine:</span> <span className="text-amber-700">{dateline}</span></p>
                    <p> <span>Posting:</span> <span className="text-amber-700">{posting}</span></p>

                    <p><span>Price Range:</span> <span className="text-amber-700">{minPrice}$-{maximum}$</span></p>



                </div>
                <h1 className="text-center mt-3 text-xl">Do you want to bid on my Job? <br /> Then fill from below and click on the Bid on the Project</h1>
                <h1 className="text-center text-xl mt-4 font-bold">Jobs Name: {title}</h1>

                <form onSubmit={handleBookingJobs} className="card-body">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} name="name" placeholder="Your bidding Amount" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Dateline</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" defaultValue={user?.email} name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Buyer Email</span>
                            </label>
                            <input type="text" defaultValue={email} name="buyer" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" name="price"
                                placeholder={`${minPrice}-${maximum}`} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <input type="text" name="details" placeholder="Write Your Details" className="input input-bordered" required />
                        </div>
                    </div>
                    {user.email === email ? (
                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-block" type="button" disabled>
                                Bid on the project
                            </button>
                        </div>
                    ) : (
                        <div className="form-control mt-6">
                            <input className="btn btn-primary btn-block" type="submit" value="Bid on the project" />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default JobDetails;
