import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db, auth } from "../../../../db";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ApexChart from "../../../test/RadarChart";

const HFFinalResult = () => {
	const user = auth.currentUser;
	const navigate = useNavigate();
	const [healthAndFitnessQuestions, setHealthAndFitnessQuestions] = useState(
		[],
	);
	const [usersAnswers, setUsersAnswers] = useState([]);

	const fetchHealthAndFitnessQuestions = async () => {
		try {
			const docRef = collection(db, "HFQuestions");
			const querySnapshot = await getDocs(docRef);
			const questionsData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setHealthAndFitnessQuestions(questionsData);
		} catch (error) {
			console.error("Error fetching Health & Fitness Questions:", error);
		}
	};

	const fetchUsersAnswers = async () => {
		try {
			const answersDocRef = doc(db, "HFResponses", user.uid);
			const answersDoc = await getDoc(answersDocRef);
			if (answersDoc.exists()) {
				setUsersAnswers(answersDoc.data().answers);
			} else {
				console.error("No such document!");
			}
		} catch (error) {
			console.error("Error fetching user answers:", error);
		}
	};

	useEffect(() => {
		fetchHealthAndFitnessQuestions();
		if (user) {
			fetchUsersAnswers();
		}
	}, [user]);

	const handlePrint = () => {
		window.print();
	};

	const handleSaveAsPDF = () => {
		const input = document.getElementById("result-content");

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "in", "letter");
			const imgWidth = 8.5;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
			pdf.save("FinalResult.pdf");
		});
	};

	const currentValues = usersAnswers.map((answer) => answer.current || 0);
	const desiredValues = usersAnswers.map((answer) => answer.desired || 0);

	return (
		<>
			{user ? (
				<div
					id="result-content"
					className="w-full h-auto flex flex-col gap-8 border-t-2 border-gray-300 py-8"
				>
					<h1 className="w-full font-bold text-2xl text-center">
						Final Result
					</h1>
					<div>
						<ApexChart
							currentValues={currentValues}
							desiredValues={desiredValues}
						/>
					</div>
					<div className="w-full flex lg:flex-row flex-col justify-evenly items-center gap-2 lg:px-44 px-8">
						<button
							onClick={handlePrint}
							className="lg:w-auto w-full flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md"
						>
							<p className="text-sm lg:text-lg font-bold"> Print </p>
							<PrintIcon />
						</button>
						<button
							onClick={handleSaveAsPDF}
							className="lg:w-auto w-full flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md"
						>
							<p className="text-sm lg:text-lg font-bold"> Save as PDF </p>
							<DownloadIcon />
						</button>
						{/* <button onClick={() => navigate('')} className="lg:w-auto w-full flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md">
                            <p className="text-sm lg:text-lg font-bold"> Share on Facebook </p>
                            <FacebookIcon />
                        </button>
                        <button onClick={() => navigate('')} className="lg:w-auto w-full flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[#6D00F8] text-white cursor-pointer rounded-md">
                            <p className="text-sm lg:text-lg font-bold"> Email my Wheel </p>
                            <EmailIcon />
                        </button> */}
					</div>
					{healthAndFitnessQuestions.map((question, index) => (
						<div
							key={index}
							className="w-full flex flex-col justify-start items-start lg:px-44 px-8"
						>
							<h2 className="text-base font-semibold">
								Question # {index + 1}
								{" : "}
								{question.question}
							</h2>
							<div className="w-full flex flex-row justify-start items-start gap-4">
								<p className="text-base font-semibold"> Answer {" : "} </p>
								<p className="text-base text-[#03009C] font-bold">
									Current Level:{" "}
									{usersAnswers[index]?.current || "Not Answered"}
								</p>
								<p className="text-base text-[#03009C]  font-bold">
									Ideal Level: {usersAnswers[index]?.desired || "Not Answered"}
								</p>
							</div>
						</div>
					))}
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

export default HFFinalResult;
