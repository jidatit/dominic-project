import React, { useState } from 'react'
import HFPage from "./QuestionTypes/HFPage"
import CEPage from "./QuestionTypes/CEPage"

const QuestionsPage = () => {
    const [SelectedSection, setSelectedSection] = useState("HF");
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center px-10'>

                <div className='w-full flex mb-[20px] gap-2 flex-col lg:flex-row justify-start items-center'>

                    <div onClick={() => setSelectedSection("HF")} className={`lg:w-[33%] w-full lg:px-2 px-1 py-2 lg:py-4 flex flex-col justify-center transition-all delay-150 cursor-pointer items-center rounded-[33px] ${SelectedSection === "HF" ? "bg-[#6D00F8] text-white" : "bg-transparent border-[#6D00F8] text-[#6D00F8] border-[3px]"} lg:text-[24px] font-semibold lg:font-bold`}>
                        <p className='text-center'>Health & Fitness</p>
                    </div>

                    <div onClick={() => setSelectedSection("CE")} className={`lg:w-[33%] cursor-pointer w-full lg:px-1 px-1 py-2 lg:py-4 flex transition-all delay-150 flex-col justify-center items-center rounded-[33px] ${SelectedSection === "CE" ? "bg-[#6D00F8] border-[3px] border-[#6D00F8] text-white" : "bg-transparent border-[#6D00F8] text-[#6D00F8] border-[3px]"} lg:text-[24px] font-semibold lg:font-bold`}>
                        <p className='text-center'>Culturescape Exploration</p>
                    </div>

                </div>

                <div className='w-full flex flex-col justify-center items-center'>
                    {SelectedSection === "HF" && (
                        <HFPage />
                    )}
                    {SelectedSection === "CE" && (
                        <CEPage />
                    )}
                </div>

            </div>
        </>
    )
}

export default QuestionsPage