import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



import { updateProfile } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FaEye and FaEyeSlash icons
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
    const { createUser, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        try {
            if (password.length < 6) {
                throw new Error('Password should be at least 6 characters or longer');
            }
            if (!/[A-Z]/.test(password)) {
                throw new Error('You can use only uppercase letters in the password');
            }

            if (!acceptedTerms) {
                throw new Error('Please accept the terms and conditions');
            }

            const result = await createUser(email, password);

            await updateProfile(result.user, {
                displayName: name,
                photoURL: photo,
            });

            console.log(result.user);

            navigate('/login');
            toast.success('Successfully registered and logged in!', {
                position: toast.POSITION.TOP_CENTER,
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>

            <hr />
            <ToastContainer />
            <div className="">

                <div className="  ">
                    <div className="mx-auto mt-3 border py-2 bg-gray-700 rounded-lg px-2 md:w-96 lg:w-1/2">
                        <form onSubmit={handleRegister} className="lg:w-96  mx-auto">

                            <h1 className="text-2xl font-bold text-white text-center">Register Now</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Your Full Name *</span>
                                </label>
                                <input type="text" name="name" placeholder="Your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Email address *</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Password *</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"} // Toggle input type
                                        name="password"
                                        placeholder="password"
                                        className="input w-full input-bordered"
                                        required
                                    />
                                    <span className="absolute text-2xl right-2 top-3">
                                        {showPassword ? (
                                            <FaEyeSlash onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" />
                                        ) : (
                                            <FaEye onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label mt-3">
                                    <input className="" type="checkbox" name="terms" onChange={() => setAcceptedTerms(!acceptedTerms)} required />
                                    <span className="label-text mr-32 md:mr-40 text-white font-bold">Accept terms and conditions *</span>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-orange-500">Register</button>
                            </div>
                        </form>

                        <p className="text-center text-white font-bold mt-5">
                            Already have an account? Please<Link className="text-blue-600 underline font-bold" to={'/login'}> Login</Link>
                        </p>
                    </div>
                </div>
            </div>
            <hr className="mt-6" />

        </div>
    );
};

export default Register;
