//React
import { useState } from 'react';

//Firebase
import { auth } from '../../Firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth';

//Components
import { Input } from '../../Components';

// Toast
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {

    const [email, setEmail] = useState('')


    const forgotPassword = async (e) => {

        e.preventDefault();

        console.log('inside reset function');

        console.log('email : ', email)

        try {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success('Reset email sent!', {
                        position: 'top-right'
                    })
                })
                .catch(() => {
                    toast.error('Reset Email Failed!', {
                        position: 'top-right'
                    });
                });

        } catch (error) {
            // toast.error('Password reset failed!', {
            //     position: 'top-right'
            // });
            console.log('testing error block!')
        }
    }

    return (
        <>
            <form
                onSubmit={forgotPassword}
                className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative">
                        <div className="absolute">
                            <div className="">
                                <div class="text-5xl font-dark font-bold">Reset Password</div>
                                <h1 className="my-2 text-gray-800 font-bold text-2xl">

                                </h1>
                                <p className="my-2 text-gray-800">Enter your email on which the account was registered.</p>
                                <Input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Send Reset Link</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default ResetPassword
