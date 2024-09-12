// Components
import { Input, Button, GlassButton } from "../../Components";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setUsername, setPassword } from "../../Redux/auth/authSlice";

// Firebase
import { auth, db, googleProvider } from "../../Firebase/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// React Toasts
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";


const Signup = () => {
    const dispatch = useDispatch();

    const email = useSelector((state) => state.auth.email);
    const username = useSelector((state) => state.auth.username);
    const password = useSelector((state) => state.auth.password);

    const handleSignup = async (event) => {
        event.preventDefault();

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);


            const currentUser = userCredentials.user;

            await setDoc(doc(db, 'Users', currentUser.uid), {
                email: currentUser.email,
                username: username
            });
            toast.success('Registration Successful!', {
                position: 'top-right'
            })

            await sendEmailVerification(currentUser);
            await signOut(auth);

            setTimeout(() => {
                window.location.href = '/verification';
            }, 2000)

        } catch (error) {
            setTimeout(() => {
                console.log('error : ', error.message)
            }, 2000)

            toast.error('User with this email already created!', {
                position: 'top-right'
            })
        }
    };

    const handleGoogleSignup = async () => {

        try {
            const userCredentials = await signInWithPopup(auth, googleProvider);

            toast.success('Registration Successful!', {
                position: 'top-right'
            })

            const currentUser = userCredentials.user;

            await setDoc(doc(db, 'Users', currentUser.uid), {
                email: currentUser.email,
                username: currentUser.displayName
            });

            await sendEmailVerification(currentUser);
            await signOut(auth);

            window.location.href = '/verification';

        } catch (error) {

            toast.error('Network Error! try again later.', {
                position: 'top-right'
            })
        }
    };

    return (
        <>
            <form onSubmit={handleSignup} className="min-h-screen bg-gray-100 text-gray-900 flex justify-center font-poppins">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <GlassButton
                                        name="Signup with Google"
                                        onClick={handleGoogleSignup}
                                    />
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign up with e-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        onChange={(e) => dispatch(setEmail(e.target.value))}
                                    />
                                    <Input
                                        placeholder="Username"
                                        type="text"
                                        onChange={(e) => dispatch(setUsername(e.target.value))}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        onChange={(e) => dispatch(setPassword(e.target.value))}
                                    />
                                    <Button name="Signup" />

                                    <p className="mt-6 text-center text-md">
                                        Already have an account?
                                        <a onClick={() => { window.location.href = 'login' }} className="border-b border-gray-500 text-indigo-500 border-dotted mx-1 hover:cursor-pointer">
                                            Login
                                        </a>
                                    </p>

                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to
                                        <a className="border-b border-gray-500 border-dotted mx-1 hover:cursor-pointer">
                                            Terms of Service
                                        </a>
                                        and
                                        <a className="border-b border-gray-500 border-dotted mx-1 hover:cursor-pointer">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=740&t=st=1726071267~exp=1726071867~hmac=ebc087e661415175d2a4e0ea0f2568c3670cd944206379f7d39c6cbea379a600')"
                            }}
                        >
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default Signup;
