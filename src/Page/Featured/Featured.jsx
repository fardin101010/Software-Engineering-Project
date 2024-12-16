import image1 from '../../assets/catagory/digital.png'
import image2 from '../../assets/catagory/web.jpg'
import image3 from '../../assets/catagory/grafic.png'
const Featured = () => {
    return (
        <div>
            <h1 className=" text-2xl md:text-4xl font-bold text-center mt-8 lg:mt-20">Featured Jobs</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-8 gap-3 lg:grid-cols-3 mx-auto  lg:px-5'>
                <div className="  card lg:w-96 glass">
                    <figure><img src={image1} className='h-60 w-80' alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Digital Marketer</h2>
                        <div className='flex gap-3'>
                            <p>Creative Agency</p>
                            <p> <span className='text-sky-400'>Price Range: </span> $3500 - $4000</p>
                        </div>
                        <p className='text-red-400  text-center font-bold'>Select Half And Full</p>
                        <div className="flex justify-center gap-6">
                            <button className="border-2  border-sky-400 px-4 py-2 rounded-lg hover:bg-lime-400">Full Time</button>
                            <button className="border-2  border-sky-400 px-4 py-2 rounded-lg hover:bg-lime-400">Half Time</button>
                        </div>
                    </div>
                </div>
                <div className="  card lg:w-96 glass ">
                    <figure><img src={image2} className='h-60 mt-3 w-80' alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Web Developer</h2>
                        <div className='flex gap-3'>
                            <p>WebWeavers</p>
                            <p> <span className='text-sky-400'>Price Range: </span> $6000 - $7000</p>
                        </div>
                        <p className='text-red-400  text-center font-bold'>Select Half And Full</p>
                        <div className="flex justify-center gap-6">
                            <button className="border-2  border-sky-400 px-4 py-2 rounded-lg hover:bg-lime-400">Full Time</button>
                            <button className="border-2  border-sky-400 px-4 py-2 rounded-lg hover:bg-lime-400">Half Time</button>
                        </div>
                    </div>
                </div>
                <div className="  card lg:w-96  glass">
                    <figure><img src={image3} className='h-60 w-80' alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Graphic Designer</h2>
                        <div className='flex gap-3'>
                            <p>TechTapestries</p>
                            <p> <span className='text-sky-400'>Price Range: </span> $3000 - $4000</p>
                        </div>
                        <p className='text-red-400  text-center font-bold'>Select Half And Full</p>
                        <div className="flex justify-center gap-6">
                            <button className="border-2  border-sky-400 px-4 py-2 rounded-lg hover:bg-lime-400">Full Time</button>
                            <button className="border-2  border-sky-400 px-4 py-2 rounded-lg hover:bg-lime-400">Half Time</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Featured;