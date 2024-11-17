import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../Navber/Navber";
import MyPostedJob from "../MyPostedJob/MyPostedJob";
import Swal from "sweetalert2";

const MyPosted = () => {
    const { user } = useContext(AuthContext);

    if (!user || !user.email) {
        return (
            <div>
                Loading... {/* You can also display a message here */}
            </div>
        );
    }

    const [MyJobs, setMyJobs] = useState([]);

    // Mocked job data
    const mockJobs = [
        {
            _id: "1",
            title: "Frontend Developer",
            company: "Tech Solutions",
            description: "Build UI for web applications.",
            category: "Web Development",
        },
        {
            _id: "2",
            title: "Graphic Designer",
            company: "Creative Studio",
            description: "Create graphics and visuals.",
            category: "Graphics Design",
        },
        {
            _id: "3",
            title: "Digital Marketer",
            company: "Marketing Pro",
            description: "Manage online campaigns.",
            category: "Digital Marketing",
        },
    ];

    useEffect(() => {
        // Simulate data fetching by setting the mock data
        setMyJobs(mockJobs);
    }, []);

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulate deletion by removing the item from the state
                const remaining = MyJobs.filter((job) => job._id !== _id);
                setMyJobs(remaining);
                Swal.fire(
                    'Deleted!',
                    'Your job post has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-center mt-6 text-3xl text-red-400 font-bold">
                <span>Total My Posted Job:</span> {MyJobs?.length}
            </h1>

            <div className="grid mx-auto grid-cols-1 lg:grid-cols-3 lg:px-5">
                {MyJobs.map((myJob) => (
                    <MyPostedJob
                        key={myJob._id}
                        myJob={myJob}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyPosted;
