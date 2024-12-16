import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../Navber/Navber";
import MyPostedJob from "../MyPostedJob/MyPostedJob";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyPosted = () => {
    const { user } = useContext(AuthContext);
    if (!user || !user.email) {
        return (
            <div>
                Loading... {/* You can also display a message here */}
            </div>
        );
    }

    const navigate = useNavigate();
    const [MyJobs, setMyJobs] = useState([]);
    const url = `http://localhost:5000/JobByEmail?email=${user.email}`;

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setMyJobs(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);
    console.log(MyJobs)


    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
            if (result.isConfirmed) {
                fetch(` http://localhost:5000/JobByEmail/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Product has been deleted.',
                                'success'
                            )
                            navigate('/post')
                            const remaining = products.filter(p => p._id !== _id);
                            console.log(remaining);
                            setProduct(remaining);
                        }
                    })
            }
        })
    }



    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-center mt-6  text-3xl text-red-400 font-bold"><span>Total My Posted Job:</span>{MyJobs?.length}</h1>


            <div className="grid mx-auto grid-cols-1 lg:grid-cols-3 lg:px-5 ">
                {
                    MyJobs.map(myJob => <MyPostedJob
                        key={myJob._id}
                        myJob={myJob}
                        handleDelete={handleDelete}
                    >

                    </MyPostedJob>

                    )
                }
            </div>
        </div >
    );
};

export default MyPosted;



