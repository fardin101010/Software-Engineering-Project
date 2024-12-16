import { Link } from "react-router-dom";


const MyPostedJob = ({ myJob, handleDelete }) => {

    const { _id, title, email, company, dateline, minPrice, maximum, description, category, short } = myJob;

    return (
        <div>
            <div>
                <div className=" ">
                    <div className="card lg:w-96 h-[500px] mt-3 bg-base-100 border border-blue-500">
                        <div className="card-body">
                            <h1><span className="text-xl font-bold">Company:</span>  <span className="text-xl font-bold text-amber-700">{company}</span></h1>
                            <h2 className="card-title">{title}</h2>
                            <p>{description}</p>
                            <p> <span>DateLine:</span> <span className="text-amber-700">{dateline}</span></p>

                            <p><span>Price Range:</span> <span className="text-amber-700">{minPrice}$-{maximum}$</span></p>
                            <p><span>Category:</span><span className="text-amber-700"> {category}</span></p>
                            <div>

                                <div className="flex justify-center gap-3 ">


                                    <Link className="w-full" to={`/update/${_id}`}>
                                        <button className=" border py-2 w-40 rounded-lg mt-4 border-blue-500 hover:bg-lime-400 ">Update</button>
                                    </Link>


                                    <Link className="w-full" to={`/update/${_id}`}>
                                        <button onClick={() => handleDelete(_id)} className=" border py-2 w-40 rounded-lg mt-4 border-blue-500 hover:bg-lime-400 ">Delete</button>
                                    </Link>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPostedJob;