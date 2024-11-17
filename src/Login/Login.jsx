import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';



import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [firebaseUser, setFirebaseUser] = useState(null);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setFirebaseUser(loggedUser);
                navigate(location?.state ? location.state : '/');
                toast.success('Successfully logged in with Google!');
            })
            .catch(error => {
                console.log('error', error.message);
            });
    }



    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        setRegisterError('');

        // Email validation
        if (!email || !password) {
            toast.error('Please enter both email and password!');
            return;
        }

        try {
            // Perform Firebase authentication
            const result = await signIn(email, password);
            console.log(result.user);
            navigate(location?.state ? location.state : '/');
            toast.success('Successfully logged in!');
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your email and password.');
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {

        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out',
        });
    }, []);

    return (
        <div>

            <hr />
            <ToastContainer position="top-center" autoClose={3000} />
            <div data-aos="fade-up" className="grid  py-11 grid-cols-1 lg:grid-cols-4">
                <div>

                </div>
                <div className="col-span-2">
                    <div className="">
                        <h1 className="text-2xl  font-bold text-center ">Please Login</h1>
                        <form onSubmit={handleLogin} className="w-80 md:w-96 lg:w-3/4 mx-auto">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email address</span>
                                </label>
                                <input type="email" name="email" placeholder="Enter Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text   font-bold">Password</span>
                                </label>
                                <div className=" relative flex   ">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input w-full input-bordered"
                                        required

                                    />
                                    <span className=" text-2xl mt-3 -ml-7">
                                        {showPassword ? (
                                            <FaEyeSlash onClick={togglePasswordVisibility} className="text-gray-400  cursor-pointer" />
                                        ) : (
                                            <FaEye onClick={togglePasswordVisibility} className="text-gray-400    cursor-pointer" />
                                        )}
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt  font-bold link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-amber-500 hover:bg-amber-200">Login</button>
                            </div>
                        </form>
                        {firebaseUser && (
                            <div>
                                {/* Display the user's profile image */}
                            </div>
                        )}
                        <p className="text-center font-bold mt-5">New to  Job Finder. Please<Link className="text-blue-600 underline font-bold" to={'/register'}> Register</Link></p>
                    </div>
                </div>
                <div>
                    <div className='p-4 space-y-3 mb-6 '>
                        <h2 className="text-2xl text-orange-500 font-bold">Login With</h2>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline   w-full">
                            <FaGoogle></FaGoogle>
                            Login with Google
                        </button>

                    </div>
                </div>
            </div>
            <hr className="mt-20" />

        </div>
    );
};

export default Login;
