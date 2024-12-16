

import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Web from '../Web/Web';
import GraphicDesign from '../CatagoryData/graphicDesign';
import Marketing from '../Marketing/Marketing';




const Category = () => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [jobs, setJobs] = useState([]);

    const handleCategoryClick = async (category) => {
        try {
            const response = await fetch(`http://localhost:5000/jobs?category=${category}`);
            if (response.ok) {
                const data = await response.json();
                setJobs(data);
            }
        } catch (error) {
            console.error(error);
        }
        setSelectedCategory(category);
    };


    return (
        <div >
            <h1 className="text-center mt-6 text-xl text-red-500">FEATURED JOBS PACKAGES</h1>
            <h1 className="text-3xl text-center font-bold mt-2">Browse Top Categories</h1>

            <Tabs>
                <div className="flex mx-20 lg:mx-0 justify-center gap-8 ">
                    <TabList>
                        <Tab onClick={() => handleCategoryClick('Web Development')}>
                            <div>
                                <h2 className="text-xl border-2 border-sky-400 w-56 px-2 py-3 hover:bg-lime-400 rounded-lg text-center pr-4 mt-4 mb-2">Web Development</h2>
                            </div>
                        </Tab>
                        <Tab onClick={() => handleCategoryClick('Graphics Design')}>
                            <div>
                                <h2 className="text-xl border-2 border-sky-400  w-56  px-2 py-3 hover:bg-lime-400 rounded-lg text-center pr-4 mt-4 mb-2">Graphics Design</h2>
                            </div>

                        </Tab>
                        <Tab>
                            <div onClick={() => handleCategoryClick('Digital Marketing')} >
                                <h2 className="text-xl border-2  w-56  border-sky-400 px-2 py-3 hover:bg-lime-400 rounded-lg text-center pr-4 mt-4 mb-2">Digital Marketing</h2>
                            </div>

                        </Tab>
                    </TabList>
                </div>


                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto lg:px-6 '>
                        {jobs.map(job =>
                            <Web
                                key={job._id}
                                job={job}
                            ></Web>)}
                    </div>
                </TabPanel>

                {/* graphic related */}
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto lg:px-6 '>
                        {jobs.map(job =>
                            <GraphicDesign
                                key={job._id}
                                job={job}
                            ></GraphicDesign>)}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto lg:px-6 '>
                        {jobs.map(job =>
                            <Marketing
                                key={job._id}
                                job={job}
                            ></Marketing>)}
                    </div>
                </TabPanel>


            </Tabs>
        </div >
    );
};

export default Category;