import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../Navber/Navber";

const AddJob = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleAddProduct = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const title = form.title.value;
        const dateline = form.dateline.value;
        const posting = form.posting.value;
        const minPrice = form.minPrice.value;
        const maximum = form.maximum.value;
        const company = form.company.value;
        const description = form.description.value;
        const category = form.category.value;
        const short = form.short.value;

        const newProduct = { title, email, company, dateline, posting, minPrice, maximum, description, category, short }

        console.log(newProduct);

        // send data to the server


        fetch('https://job-finde-server-lake.vercel.app/jobs', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Job Posting successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    navigate('/')
                }
            })

    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="">


                <div className=" px-6 mt-4 mb-6 rounded-lg border-2  border-orange-600 lg:w-[900px] mx-auto">


                    <h1 className="md:text-3xl text-center  font-extrabold ">ADD JOBS</h1>
                    <form onSubmit={handleAddProduct}>
                        {/* form row */}
                        <div className="md:flex  gap-4 mb-5">

                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="text-xl">Email
                                    </span>
                                </label>
                                <label className="input-group">

                                    <input type="email" name="email" defaultValue={user ? user.email : 'email'} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl ">Job title</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="title" placeholder="Job title" className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>



                        {/* form row */}
                        <div className="md:flex gap-4 mb-5">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl ">Deadline</span>
                                </label>
                                <label className="input-group">

                                    <input type="date" name="dateline" placeholder="Deadline" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl">Posting Date</span>
                                </label>
                                <label className="input-group">

                                    <input type="date" name="posting" placeholder="Posting Date" className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        {/* form row */}
                        <div className="md:flex gap-4 mb-5">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl ">Minimum Price</span>
                                </label>
                                <label className="input-group">

                                    <input type="text" name="minPrice" placeholder="Minimum  Price" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl  ">Maximum price

                                    </span>
                                </label>
                                <label className="input-group">

                                    <input type="text" name="maximum" placeholder=" Maximum price
" className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        {/* form row */}
                        <div className="md:flex gap-4 mb-5">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl">Company Name</span>
                                </label>
                                <label className="input-group">

                                    <input type="text" name="company" placeholder="Company Name" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl">Category</span>
                                </label>
                                <label >
                                    <select id="category" name="category" className=" w-full input input-bordered">
                                        <option>Select Category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Graphics Design">Graphics Design</option>
                                        <option value="Digital Marketing">Digital Marketing</option>


                                    </select>
                                </label>
                            </div>

                        </div>
                        {/* form row */}
                        <div className="md:flex gap-4 mb-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-xl  "> Description
                                    </span>
                                </label>
                                <label className="input-group">

                                    <input type="text" name="description"
                                        placeholder="Description"
                                        className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-xl  "> Short Description
                                    </span>
                                </label>
                                <label className="input-group">

                                    <input type="text" name="short"
                                        placeholder="Short Description"
                                        className="input input-bordered w-full" />
                                </label>
                            </div>

                        </div>


                        <input className="text-xl mb-4 rounded-md  border px-2 py-2 border-red-700  w-full cursor-pointer hover:bg-orange-400" type="submit" value="ADD JOBS" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddJob;