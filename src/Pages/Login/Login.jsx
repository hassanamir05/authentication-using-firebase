// Components
import { Input, Button, GlassButton } from "../../Components";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setUsername, setPassword } from "../../Redux/auth/authSlice";

// Firebase
import { auth } from "../../Firebase/firebase";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";

//Toast
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const dispatch = useDispatch();

    const email = useSelector((state) => state.auth.email);
    const password = useSelector((state) => state.auth.password);

    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            const currentUser = auth.currentUser;

            if (currentUser.emailVerified) {
                toast.success('Login Successful!', {
                    position: 'top-right'
                })

                setTimeout(() => {
                    window.location.href = 'signup'
                }, 2000)

            }

            else {
                await sendEmailVerification(currentUser)
                window.location.href = '/verification'
            }



        } catch (error) {

            toast.error('Invalid Credentials', {
                position: 'top-right'
            })
        }
    };

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
                                    <GlassButton name="Login with Google" />
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
                                        type="password"
                                        onChange={(e) => dispatch(setPassword(e.target.value))}
                                    />

                                    {error && (
                                        <p className="text-red-500 text-center mt-4">{error}</p>
                                    )}

                                    <Button name="Login" />

                                    <p className="mt-6 text-center text-md">
                                        Don't have an account?
                                        <a onClick={() => { window.location.href = 'signup' }} className="border-b border-gray-500 text-indigo-500 hover:cursor-pointer border-dotted mx-1 ">
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
