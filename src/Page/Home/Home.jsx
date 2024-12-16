import Navbar from "../../Navber/Navber";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import Tour from "../Tour/Tour";



const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Category></Category>

            <Tour></Tour>

            <Featured></Featured>

            <About></About>

        </div>
    );
};

export default Home;