import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import StarIcon from '@mui/icons-material/Star';
import { doc, collection, getDocs, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../../db';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HFResponse = () => {

    const user = auth.currentUser;
    const navigate = useNavigate();
    const [introductionState, setIntroductionState] = useState(true);
    const [healthAndFitnessQuestions, setHealthAndFitnessQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [usersAnswers, setUsersAnswers] = useState([]);

    const fetchHealthAndFitnessQuestions = async () => {
        try {
            const docRef = collection(db, 'HFQuestions');
            const querySnapshot = await getDocs(docRef);
            const questionsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setHealthAndFitnessQuestions(questionsData);
        } catch (error) {
            console.error('Error fetching Health & Fitness Questions:', error);
        }
    };

    useEffect(() => {
        fetchHealthAndFitnessQuestions();
        localStorage.removeItem('desiredDestination');
    }, []);

    const handleStart = () => {
        setIntroductionState(false);
        setUsersAnswers([]);
    };

    const handlePrevious = () => {
        if (questionIndex > 0) {
            setQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleBackToStart = () => {
        setIntroductionState(true);
    }

    const handleSubmit = async () => {
        console.log(usersAnswers);
        try {
            const answersCollectionRef = doc(db, 'HFResponses', user.uid);
            await setDoc(answersCollectionRef, { userid: user.uid, answers: usersAnswers }, { merge: true });
            console.log('Answers submitted successfully!');
            toast.success("Your Response Submitted Successfully");
            setTimeout(() =>{
                navigate('/health-and-fitness-assessment-final-result');
            }, 5000);
        } catch (error) {
            console.error('Error submitting answers:', error);
            toast.error("Error Submitting your Response");
        }
    }

    const handleNext = () => {
        const currentAnswer = usersAnswers[questionIndex]?.current;
        const desiredAnswer = usersAnswers[questionIndex]?.desired;
        if (currentAnswer && desiredAnswer && questionIndex < healthAndFitnessQuestions.length - 1) {
            setQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            toast.error("Please Rate your Current & Ideal Level");
        }
    };
    
    const handleCurrentValueChange = (value) => {
        const updatedUsersAnswers = [...usersAnswers];
        updatedUsersAnswers[questionIndex] = {
            ...updatedUsersAnswers[questionIndex],
            current: value
        };
        setUsersAnswers(updatedUsersAnswers);
    };
    
    const handleDesiredValueChange = (value) => {
        const updatedUsersAnswers = [...usersAnswers];
        updatedUsersAnswers[questionIndex] = {
            ...updatedUsersAnswers[questionIndex],
            desired: value
        };
        setUsersAnswers(updatedUsersAnswers);
    };

    const classForCurrentState = (rating) => {
        const baseClasses = 'px-5 py-2 font-semibold text-lg cursor-pointer';
        const defaultTextColor = 'text-[#6D00F8]';
        const selectedTextColor = 'text-white';
        const selectedBgColor = 'bg-[#6D00F8]';
        const defaultBgColor = 'bg-white';

        if (usersAnswers[questionIndex]?.current === rating) {
            return `${baseClasses} ${selectedTextColor} ${selectedBgColor}`;
        } else {
            return `${baseClasses} ${defaultTextColor} ${defaultBgColor}`;
        }
    };

    const classForDesiredState = (rating) => {
        const baseClasses = 'px-5 py-2 font-semibold text-lg cursor-pointer';
        const defaultTextColor = 'text-[#6D00F8]';
        const selectedTextColor = 'text-white';
        const selectedBgColor = 'bg-[#6D00F8]';
        const defaultBgColor = 'bg-white';

        if (usersAnswers[questionIndex]?.desired === rating) {
            return `${baseClasses} ${selectedTextColor} ${selectedBgColor}`;
        } else {
            return `${baseClasses} ${defaultTextColor} ${defaultBgColor}`;
        }
    };

    return (
        <>
            {user ? (
                <div className="w-full h-auto flex flex-col gap-8 border-t-2 border-gray-300 py-8">
                    {introductionState === true ? (
                        <>
                            <h1 className="w-full font-bold text-2xl text-center">
                                Health & Fitness
                            </h1>
                            <p className="w-full text-lg text-center lg:px-44 px-8">
                                Imagine a canvas where your physical activities, dietary choices, and rest patterns paint the picture of your well-being. It's a personal journey that varies widely among individuals, where each has their unique rhythm and definition of vitality.
                            </p>
                            <div className="w-full flex justify-end items-center lg:px-44 px-8">
                                <button onClick={handleStart} className="w-40 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md">
                                    <p className="text-sm lg:text-lg font-bold"> Start </p>
                                    <EastIcon />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <ToastContainer />
                            <p className="w-full text-lg text-center lg:px-44 px-8">
                                {healthAndFitnessQuestions.length > 0 ? healthAndFitnessQuestions[questionIndex]?.question : '-'}
                            </p>
                            <div className="w-full h-auto flex flex-col justify-center items-center gap-4 lg:px-44 px-8">
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <StarIcon sx={{ color: '#6D00F8' }} />
                                    <p className="text-gray-900">
                                        On a scale of 1 to 10, rate where your current level is in this area of life?
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center gap-0 cursor-pointer">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i + 1}
                                            onClick={() => handleCurrentValueChange(i + 1)}
                                            className={`${classForCurrentState(i + 1)} ${i === 0 ? 'border-2 border-customPurple rounded-tl-lg rounded-bl-lg' : i === 9 ? 'border-t-2 border-b-2 border-r-2 border-customPurple rounded-tr-lg rounded-br-lg' : 'border-t-2 border-b-2 border-r-2 border-customPurple'}`}>
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-auto flex flex-col justify-center items-center gap-4 lg:px-44 px-8">
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <StarIcon sx={{ color: '#6D00F8' }} />
                                    <p className="text-gray-900">
                                        On a scale of 1 to 10, rate where would you ideally want to be in this area of life?
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center gap-0 cursor-pointer">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i + 1}
                                            onClick={() => handleDesiredValueChange(i + 1)}
                                            className={`${classForDesiredState(i + 1)} ${i === 0 ? 'border-2 border-customPurple rounded-tl-lg rounded-bl-lg' : i === 9 ? 'border-t-2 border-b-2 border-r-2 border-customPurple rounded-tr-lg rounded-br-lg' : 'border-t-2 border-b-2 border-r-2 border-customPurple'}`}>
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full flex justify-between items-center lg:px-44 px-8">


                                {questionIndex === 0 ? (
                                    <>
                                        <button onClick={handleBackToStart} className="w-52 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md">
                                            <WestIcon />
                                            <p className="text-sm lg:text-lg font-bold"> Back to Start </p>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handlePrevious} className="w-40 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md">
                                            <WestIcon />
                                            <p className="text-sm lg:text-lg font-bold"> Previous </p>
                                        </button>
                                    </>
                                )}
                                {questionIndex === 9 ? (
                                    <>
                                        <button onClick={handleSubmit} className="w-40 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md">
                                            <p className="text-sm lg:text-lg font-bold"> Submit </p>
                                            <EastIcon />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleNext} className="w-40 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md">
                                            <p className="text-sm lg:text-lg font-bold"> Next </p>
                                            <EastIcon />
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="w-full h-auto flex flex-col gap-8 border-t-2 border-gray-300 py-8">
                    <h1 className="w-full font-bold text-2xl text-center">
                        Please Login First
                    </h1>
                </div>
            )}
        </>
    );
};

export default HFResponse;