import React, { useState } from 'react';
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../db';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing in:', error.message);
        }
    };

    return (
        <div className='w-[80%] transition ease-in-out delay-100 mt-[30px] mb-[30px] md:w-[60%] flex flex-col gap-5 p-5 justify-center items-center rounded-md bg-white'>
            <img src={logo} className='mt-[30px]' alt="" />

            <h2 className="text-center text-[22px] md:text-[28px] mb-[10px] font-bold leading-9 tracking-tight text-gray-900">Login</h2>

            <input type="email" id="email" name="email" placeholder="Email" className="w-full md:w-[60%] border-gray-300 border rounded-md px-4 py-4 focus:outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" id="password" name="password" placeholder="Password" className="w-full md:w-[60%] border-gray-300 border rounded-md px-4 py-4 focus:outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="w-full md:w-[60%] flex flex-col justify-center items-end">
                <a href="#" className="md:text-[15px] text-[12px] hover:underline">Forgot password?</a>
            </div>
            <button className="bg-[#6D00F8] w-full md:w-[60%] text-[20px] font-bold text-white px-4 py-2 rounded-md" onClick={handleLogin}>Login</button>

            <div className="w-full md:w-[60%] flex flex-col justify-center items-end">
                <Link to="/auth/signup"><p className="md:text-[15px] text-[12px] hover:underline">Not a member?</p></Link>
            </div>

            <div className="w-full md:w-[60%]">
                <Link to="/auth/signup" className="block"><button className="bg-[#2187A2] w-full text-[20px] font-bold text-white px-4 py-2 rounded-md">Sign up</button></Link>
            </div>

            <div className="w-full flex flex-col justify-center gap-2 items-center md:w-[60%]">
                <p className='text-center'>Sign up using</p>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='h-[40px] w-[40px]' viewBox="0 0 48 48">
                    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                </svg>
            </div>

        </div>
    )
}

export default Login;
