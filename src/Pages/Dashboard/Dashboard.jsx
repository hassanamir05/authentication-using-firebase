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
            setCurrentUser('');
        }
    }, []);

    return (
        <>
            <form className='w-full h-full min-h-screen flex flex-col justify-center items-center'
                onSubmit={handleSignout}>
                <p>Welcome {currentUser || 'User'}</p>
                <Button
                    name="Signout"
                    customClass='bg-red-500 hover:bg-red-400 max-w-[350px] w-full mx-[30px]'
                />
            </form>
            <ToastContainer />
        </>
    );
};

export default Dashboard;
