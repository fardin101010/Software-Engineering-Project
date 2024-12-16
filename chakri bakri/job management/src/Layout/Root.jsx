import { Outlet } from "react-router-dom";
import Footer from "../Page/Footer/Footer";



const Root = () => {
    return (
        <div className=" bg-white  mx-auto font-poppins">
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;