import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "../../Navber/Navber";


const UpdateJob = () => {

    const { user } = useContext(AuthContext)
    const updatedJobs = useLoaderData();
    const navigate = useNavigate();



    const { _id, title, dateline, minPrice, maximum, description, short, category } = updatedJobs;

    const handleUpdatedJobs = event => {

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

        const updateJob = { title, email, company, dateline, posting, minPrice, maximum, description, category, short };

        console.log(updateJob);



        fetch(` https://job-finder-serve-lake.vercel.app/JobByEmail/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateJob)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })

                    navigate('/post')
                }
            })


    }





    return (
        <div>
            <Navbar></Navbar>
            <div className="">
                <div className="lg:px-24 mb-6">


                    <h1 className="md:text-3xl text-center  font-extrabold">Update Job</h1>
                    <form onSubmit={handleUpdatedJobs}>
                        {/* form row */}
                        <div className="md:flex gap-4 mb-5">

                            <div className="form-control md:w-1/2">
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
                                    <input type="text" name="title" defaultValue={title} placeholder="Job title" className="input input-bordered w-full" />
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

                                    <input type="date" name="dateline" defaultValue={dateline} placeholder="Deadline" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl">Posting Date</span>
                                </label>
                                <label className="input-group">

                                    <input type="date"

                                        name="posting" placeholder="Posting Date" className="input input-bordered w-full" />

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

                                    <input type="text" name="minPrice" defaultValue={minPrice} placeholder="Minimum  Price" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl  ">Maximum price

                                    </span>
                                </label>
                                <label className="input-group">

                                    <input type="text" defaultValue={maximum} name="maximum" placeholder=" Maximum price
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

                                    <input type="text" name="company"

                                        placeholder="Company Name" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl">Category</span>
                                </label>
                                <label >
                                    <select id="category" defaultValue={category} name="category" className=" w-full input input-bordered">
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

                                    <input type="text" name="description" defaultValue={description}
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

                                    <input type="text" name="short" defaultValue={short}
                                        placeholder="Short Description"
                                        className="input input-bordered w-full" />
                                </label>
                            </div>

                        </div>


                        <input className="text-xl rounded-md  border px-2 py-2 border-red-700  w-full cursor-pointer hover:bg-orange-400" type="submit" value="Update Jobs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateJob;