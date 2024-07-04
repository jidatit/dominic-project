import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, collection, getDocs, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../../db';
import UserProfilePicture from '../../../assets/placeholder.jpg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {

    const user = auth.currentUser;
    const navigate = useNavigate();

    return (
        <>
            {user ? (
                <div className="w-full h-auto min-h-[520px] flex flex-col justify-center items-center gap-8 border-t-2 border-gray-300 py-8">
                    <h1 className="w-full font-bold text-2xl text-center">
                        User Profile
                    </h1>
                    <div className="w-[80%] min-h-screen flex justify-center items-start border-2 border-red-700">
                        <div className='w-[70%] px-8 py-4' >
                            <span className="h-[15%] w-[15%]">
                                <img src={UserProfilePicture} alt="user profile photo" className="h-[15%] w-[15%] rounded-full border-2 border-gray-300" />
                            </span>

                        </div>
                        <div className='w-[30%] flex flex-col justify-start items-start gap-2 py-4' >
                            <div onClick={() => navigate('/health-and-fitness-assessment')} className='flex justify-start items-center gap-3 font-semibold text-xl cursor-pointer'>
                                <p className='text-gray-900' > Take Health & Fitness Quiz </p>
                                <ArrowForwardIosIcon sx={{ fontSize: '15px' }} />
                            </div>
                            <div onClick={() => navigate('/culturescope-exploration-assessment')} className='flex justify-start items-center gap-3 font-semibold text-xl cursor-pointer'>
                                <p className='text-gray-900' > Take Culturescape Exploration Quiz </p>
                                <ArrowForwardIosIcon sx={{ fontSize: '15px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-auto min-h-[520px] flex flex-col gap-8 border-t-2 border-gray-300 py-8">
                    <h1 className="w-full font-bold text-2xl text-center">
                        Please Login First
                    </h1>
                </div>
            )}
        </>
    );
};

export default UserProfile;