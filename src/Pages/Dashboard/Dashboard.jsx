//Firebase
import { auth } from '../../Firebase/firebase';


//Components
import { Button } from '../../Components';

//Toast
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// const contacts = ['Contact 1', 'Contact 2', 'Contact 3', 'Contact 4', 'Contact 5', 'Contact 6'];


const Dashboard = () => {


    const handleSignout = () => {
        auth.signOut()
        toast.error(('Signing Out!'), {
            position: 'top-right'
        })
        setTimeout(() => {
            window.location.href = 'login'
        }, 2000)
    }

    return (
        // <div className="min-h-screen flex bg-gray-100">
        //     {/* Sidebar */}
        //     <aside className="bg-white bg-opacity-10 backdrop-blur-md h-screen w-64 p-5 shadow-lg flex flex-col justify-between">
        //         <nav className="space-y-6 text-xl text-gray-800 flex flex-col gap-y-[20px]">
        //             <button className="hover:text-gray-600">Chats</button>
        //             <button className="hover:text-gray-600">Contacts</button>
        //             <button className="hover:text-gray-600">Settings</button>
        //         </nav>
        //         <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white text-lg rounded-lg">Logout</button>
        //     </aside>

        //     {/* Main Section */}
        //     <main className="flex-1 flex p-6 justify-center items-center">
        //         {/* Contact List */}
        //         <section className="w-1/3 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-4 overflow-y-auto h-[80vh]">
        //             <h2 className="text-lg font-bold mb-4 text-center">Contacts</h2>
        //             <div className="space-y-4">
        //                 {contacts.map((contact, index) => (
        //                     <button key={index} className="w-full p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-gray-800">
        //                         {contact}
        //                     </button>
        //                 ))}
        //             </div>
        //         </section>

        //         {/* Scrollable Chat Section */}
        //         <section className="flex-1 ml-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-4 h-[80vh]">
        //             <div className="overflow-y-auto h-full">
        //                 <p className="text-center text-lg text-gray-600">Scrollbar content</p>
        //             </div>
        //         </section>
        //     </main>
        // </div>

        <>
            <div className='w-full h-full min-h-screen flex flex-col justify-center items-center'>
                <p>Welcome {auth.currentUser.displayName}</p>
                <Button name="Signout" customClass='bg-red-500 hover:bg-red-400 max-w-[350px] w-full mx-[30px]' onCLick={handleSignout} />
            </div>
            <ToastContainer />
        </>
    );
};

export default Dashboard;
