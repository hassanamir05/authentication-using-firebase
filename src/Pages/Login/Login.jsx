// Components
import { Input, Button, GlassButton } from "../../Components";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword } from "../../Redux/auth/authSlice";

// Firebase
import { auth, googleProvider } from "../../Firebase/firebase";
import { signInWithEmailAndPassword, sendEmailVerification, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

// Toast
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// React Router
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useSelector((state) => state.auth.email);
    const password = useSelector((state) => state.auth.password);

    const [error, setError] = useState(null);
    const [showPass, setShowPass] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            const currentUser = auth.currentUser;

            if (currentUser.emailVerified) {
                toast.success('Login Successful!', {
                    position: 'top-right'
                });

                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);

            } else {
                await sendEmailVerification(currentUser);
                navigate('/verification');
            }

        } catch (error) {
            setError('Invalid Credentials');
            toast.error('Invalid Credentials', {
                position: 'top-right'
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
            console.log('response: ', response.user.displayName);

            toast.success('Login Successful!', {
                position: 'top-right'
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (error) {

            toast.error('Google login failed', {
                position: 'top-right'
            });
        }
    };

    const forgotPassword = async () => {
        console.log('inside reset function');

        console.log('email : ', email)

        try {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success('Reset email sent!', {
                        position: 'top-right'
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });

        } catch (error) {
            toast.error('Password reset failed!', {
                position: 'top-right'
            });
        }
    }


    return (
        <>
            <form
                onSubmit={handleLogin}
                className="min-h-screen bg-gray-100 text-gray-900 flex justify-center font-poppins">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1726071339~exp=1726074939~hmac=17483f8e15aaf4881163de5d47c496e2fab604b3e2026426dcf0fa8df2e8271f&w=740')"
                            }}
                        >
                        </div>
                    </div>

                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Login
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <GlassButton name="Login with Google" onClick={handleGoogleLogin} />
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or login with e-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        onChange={(e) => dispatch(setEmail(e.target.value))}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type={`${showPass ? 'text' : 'password'}`}
                                        onChange={(e) => dispatch(setPassword(e.target.value))}
                                    />

                                    <div className="flex justify-between items-center text-[14px] w-full mt-3">

                                        <div className="flex flex-row w-[70%] h-[20px]">
                                            <input type="checkbox" id="show-pass" className='w-[40px] h-[20px]  m-0 ' onChange={() => { setShowPass(!showPass) }} />
                                            <label htmlFor="show-pass" className="w-[150px]">Show Password</label>
                                        </div>

                                        <a href="#" className="w-full text-right text-blue-400 underline" onClick={forgotPassword}>Forgot Password</a>
                                    </div>

                                    {error && (
                                        <p className="text-red-500 text-center mt-4">{error}</p>
                                    )}

                                    <Button name="Login" />

                                    <p className="mt-6 text-center text-md">
                                        Don't have an account?
                                        <a onClick={() => { navigate('/signup') }} className="border-b border-gray-500 text-indigo-500 hover:cursor-pointer border-dotted mx-1">
                                            Signup
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default Login;
