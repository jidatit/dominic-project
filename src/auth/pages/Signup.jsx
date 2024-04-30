import React, { useState } from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import { auth, db } from '../../../db';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hasEmptyValue } from '../../utils/helperSnippets';

const Signup = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        signupType: 'User'
    });

    const [passwordError, setPasswordError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

        if (name === 'confirmPassword' && userData.password !== value) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const handleSignup = async () => {
        try {
            const { confirmPassword, password, ...userDataWithoutPasswords } = userData;
            if (confirmPassword !== password) {
                toast.error("Password Not Matched!")
                return
            }
            if (hasEmptyValue(userDataWithoutPasswords)) {
                toast.error("Fill all Fields!")
                return
            }
            const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            await setDoc(doc(db, "users", user.uid), userDataWithoutPasswords);
            toast.success("User registered!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className='w-[80%] transition ease-in-out delay-100 md:w-[60%] mt-[30px] mb-[30px] flex flex-col gap-5 p-5 justify-center items-center rounded-md bg-white'>
                <img src={logo} className='mt-[30px]' alt="" />

                <h2 className="text-center text-[22px] md:text-[28px] mb-[10px] font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>

                <input type="text" name="name" placeholder="Name" className="w-full md:w-[60%] border-gray-300 border rounded-md px-4 py-4 focus:outline-none focus:border-blue-500" value={userData.name} onChange={handleInputChange} required />

                <input type="email" name="email" placeholder="Email" className="w-full md:w-[60%] border-gray-300 border rounded-md px-4 py-4 focus:outline-none focus:border-blue-500" value={userData.email} onChange={handleInputChange} required />

                <input type="number" name="phoneNumber" placeholder="Phone Number" className="w-full md:w-[60%] border-gray-300 border rounded-md px-4 py-4 focus:outline-none focus:border-blue-500" value={userData.phoneNumber} onChange={handleInputChange} required />

                <input type="password" name="password" placeholder="Password" className="w-full md:w-[60%] border-gray-300 border rounded-md px-4 py-4 focus:outline-none focus:border-blue-500" value={userData.password} onChange={handleInputChange} required />

                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full md:w-[60%] border-gray-300 border rounded-md px-4 py-4 focus:outline-none focus:border-blue-500" value={userData.confirmPassword} onChange={handleInputChange} required />

                {passwordError && <p className="text-red-500">{passwordError}</p>}

                <button
                    disabled={passwordError}
                    className={`bg-[#6D00F8] ${passwordError && "bg-gray-400"} w-full md:w-[60%] text-[20px] font-bold text-white px-4 py-2 rounded-md`}
                    onClick={handleSignup}
                >
                    Register
                </button>

                <div className="w-full md:w-[60%] flex flex-col justify-center items-end">
                    <Link to="/auth"> <p className="md:text-[15px] text-[12px] hover:underline">Already a member?</p></Link>
                </div>

                <div className="w-full mb-[30px] md:w-[60%]">
                    <Link to="/auth" className="block"><button className="bg-[#2187A2] w-full text-[20px] font-bold text-white px-4 py-2 rounded-md">Login</button></Link>
                </div>

                <div className="w-full flex flex-col justify-center gap-2 items-center md:w-[60%]">
                    <p className='text-center'>Sign up using</p>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='h-[40px] w-[40px]' viewBox="0 0 48 48">
                        <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                    </svg>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}

export default Signup
