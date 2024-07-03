import React, { useEffect, useState } from 'react'
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from '../../../../db';

const HFHome = () => {

    const [healthAndFitnessQuestions, setHealthAndFitnessQuestions] = useState([]);
    const [questionOneState, SetQuestionOneState] = useState(false);

    const fetchHealthAndFitnessQuestions = async () => {
        try {
            const docRef = collection(db, 'HFQuestions');
            const queryShapshot = await getDocs(docRef);
            const questionsData = [];
            queryShapshot.forEach((doc) => {
                questionsData.push({ id: doc.id, ...doc.data() });
            });
            console.log('Questions : ', questionsData);
            setHealthAndFitnessQuestions(questionsData);
        } catch (error) {
            console.error("Error fetching Health & Fitness Questions : ", error);
        }
    }

    useEffect(() => {
        fetchHealthAndFitnessQuestions();
    }, []);

    return (
        <>
            <div className='w-full h-auto flex flex-col gap-8 border-t-2 border-gray-300 py-8'>
                <h1 className='w-full font-bold text-2xl text-center'>
                    Health & Fitness
                </h1>

                {questionOneState === false ? (
                    <>
                        <p className='w-full text-lg text-center lg:px-44 px-8'>
                            Imagine a canvas where your physical activities, dietary choices, and rest patterns paint the picture of your well-being. It's a personal journey that varies widely among individuals, where each has their unique rhythm and definition of vitality.
                        </p>
                        <div className='w-full flex justify-end items-center lg:px-44 px-8'>
                            <button onClick={() => SetQuestionOneState(true)} className='w-40 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md'>
                                <p className='text-sm lg:text-lg font-bold'> Start </p>
                                <EastIcon />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='w-full text-lg text-center lg:px-44 px-8'>
                            {healthAndFitnessQuestions ? healthAndFitnessQuestions[0].question : '-'}
                        </p>
                        <div className='w-full flex justify-between items-center lg:px-44 px-8'>
                            <button className='w-40 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md'>
                                <WestIcon />
                                <p className='text-sm lg:text-lg font-bold'> Previous </p>
                            </button>
                            <button className='w-40 flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md'>
                                <p className='text-sm lg:text-lg font-bold'> Next </p>
                                <EastIcon />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default HFHome;