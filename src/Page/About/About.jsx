
import { Link } from 'react-router-dom';
import about from '../../assets/catagory/about.jpg'

const About = () => {
    return (
        <div className='lg:flex mx-auto bg-slate-100 mt-7 justify-center px-7 lg:px-10  gap-7 '>
            <div className="space-y-2  lg:w-1/2 mt-10">
                <h1 className="text-xl text-red-400">WHAT WE ARE DOING</h1>
                <h1 className="text-2xl lg:text-4xl font-bold text-blue-400">24k Talented people are getting Jobs</h1>
                <h1 className="text-justify">At Job Flender, we are more than just a job placement agency; we are your trusted partner in the journey towards meaningful employment. We understand the aspirations and talents of job seekers and work diligently to connect them with opportunities that align with their career goals and aspirations.</h1>
                <h1>We believe that every individual has unique skills and potential waiting to be discovered. Our mission is to empower job seekers by providing them with the tools, resources, and support they need to excel in their careers.</h1>

                <Link to={'/add'}>
                    <button className='border-2 mt-7 hover:bg-lime-400 rounded-lg border-sky-400 px-7 py-4 font-bold'>Post A Job</button>
                </Link>
            </div>
            <div className=' lg:w-1/2 mt-5 mb-7 relative  '>
                <img className='lg:h-[400px]' src={about} alt="about" />
                <div className='bg-lime-400 hidden lg:block w-48 h-40 text-center absolute top-60 -ml-12' >
                    <h1 className='pt-10 text-white font-bold'>Since</h1>
                    <h1 className='text-5xl text-white font-bold'>2024</h1>
                </div>
            </div>
        </div>
    );
};

export default About;