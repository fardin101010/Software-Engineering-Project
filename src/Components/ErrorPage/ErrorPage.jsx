import { Link } from "react-router-dom";
import img from '../../assets/catagory/401-error.jpg'


const ErrorPage = () => {
    return (
        <div className=" mx-auto text-center lg:my-40 ">
            <img className="flex justify-center mx-auto w-96" src={img} alt="" />
            <h1 className="text-3xl text-center">Oops!!!</h1>
            <h1 className="text-3xl text-center">
                No Data Founded
            </h1>
            <Link className="btn" to={'/'}>Go back Home</Link>
        </div>
    );
};

export default ErrorPage;