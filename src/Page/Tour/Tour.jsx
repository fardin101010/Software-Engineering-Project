import img1 from '../../assets/catagory/tour.jpg'
const Tour = () => {
    return (
        <div>
            <div className=" relative mt-10  w-full">
                <img src={img1} className="w-full h-[500px] " />
                <div className="absolute  flex  justify-center mx-auto h-[500px] top-10  bg-gradient-to-r from-[#151515] to-[rgba(23, 24, 23, 0.00)]">
                    <div className='text-white space-y-4'>
                        <h1 className="lg:text-5xl mx-auto mt-20 text-center font-bold">FEATURED TOURS PACKAGES</h1>
                        <p className='lg:text-6xl text-center text-sky-400 px-7 font-bold'>Make a Difference with Your Online Resume!</p>


                        <div className='flex justify-center'>
                            <button className="border-2 border-sky-400 px-5 py-3 rounded-lg hover:bg-lime-400 font-bold text-xl">UPLOAD YOUR CV</button>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Tour;