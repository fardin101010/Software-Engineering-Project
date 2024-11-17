import { Link } from "react-router-dom";

const Web = ({ job }) => {
    const { _id, title, email, company, dateline, posting, minPrice, maximum, description, category, short } = job;

    return (
        <div className="mx-auto">
            <div className="card lg:w-96 mt-2 lg:h-96 bg-base-100 border border-blue-500">
                <div className="card-body">
                    <h1><span className="text-xl font-bold">Company:</span>  <span className="text-xl font-bold text-amber-700">{company}</span></h1>
                    <h2 className="card-title">{title}</h2>
                    <p>{short}</p>
                    <p> <span>DateLine:</span> <span className="text-amber-700">{dateline}</span></p>
                    <p><span>Posting:</span> <span className="text-amber-700">{posting}</span></p>
                    <p><span>Price Range:</span> <span className="text-amber-700">{minPrice}$-{maximum}$</span></p>
                    <p><span>Category:</span><span className="text-amber-700"> {category}</span></p>
                    <div className="card-actions justify-center">
                        <Link className="w-full" to={`jobs/${_id}`}>
                            <button className="border py-2 w-full rounded-lg mt-4 border-blue-500 hover:bg-lime-400">
                                Bid now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Web;
