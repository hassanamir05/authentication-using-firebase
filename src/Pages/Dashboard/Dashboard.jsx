import { auth } from '../../Firebase/firebase';
import { signOut } from 'firebase/auth';

//React Hooks
import { useState, useEffect } from 'react';

//Components
import { Button } from '../../Components';

//Toast
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false)


    const handleSignout = (e) => {

        e.preventDefault();

        auth.signOut();


        toast.error('Signing Out!', {
            position: 'top-right'
        });
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    };

    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setCurrentUser(user.displayName);
        } else {
            toast.error('You need to login first!', {
                position: 'top-right'
            })
            setTimeout(() => {
                //put a delay of 1 seconds before navigating to the login page
                window.location.href = '/login'
            }, 1000)
        }
    }, []);

    return (

        <>
            <>
                {
                    loggedIn ?
                        <form className='w-full h-full min-h-screen flex flex-col justify-center items-center'
                            onSubmit={handleSignout}>
                            <p>Welcome {currentUser || 'User'}</p>
                            <Button
                                name="Signout"
                                customClass='bg-red-500 hover:bg-red-400 max-w-[350px] w-full mx-[30px]'
                                onCLick={handleSignout}
                            />
                        </form> :
                        <></>
                }
            </>
            <ToastContainer />
        </>
    );
};

export default Dashboard;
