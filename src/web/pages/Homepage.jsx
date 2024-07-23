import React from "react";
import { auth } from "../../../db";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/background.jpg";
import PieChart from "../components/PieChart";

const Homepage = () => {
	const navigate = useNavigate();
	const { signupType } = useAuth();
	const user = auth.currentUser;

	const handleHealthAndFitnessAssessment = () => {
		if (user) {
			navigate("/health-and-fitness-assessment");
		} else {
			localStorage.setItem(
				"desiredDestination",
				"/health-and-fitness-assessment",
			);
			navigate("/auth");
		}
	};

	const handleCulturescopeExplorationAssessment = async () => {
		if (user) {
			navigate("/culturescope-exploration-assessment");
		} else {
			localStorage.setItem(
				"desiredDestination",
				"/culturescope-exploration-assessment",
			);
			navigate("/auth");
		}
	};

	return (
		<>
			<div className="w-full h-auto flex flex-col">
				<div className="relative w-full min-h-screen">
					<img
						src={BackgroundImage}
						alt="Background Image"
						className="w-full min-h-screen object-cover"
					/>
					<div className="absolute top-0 left-0 w-full h-full bg-[#1c1b1b] opacity-80"></div>
					<div className="absolute top-[50%] left-[50%] w-full lg:px-44 px-8 text-white transform -translate-x-1/2 -translate-y-1/2">
						<h1 className="text-2xl lg:text-4xl text-center font-bold mb-6">
							{" "}
							DOMINIC RICHARD LEVIEN{" "}
						</h1>
						<p className="text-xl text-center">
							Welcome to your journey of self-discovery and personal growth.
							This platform is a space for you to reflect deeply on various
							aspects of your life, offering a unique opportunity to understand
							yourself better and to envision the life you aspire to live. As
							you explore each category, we invite you to engage thoughtfully
							with the questions and reflections presented, considering how each
							area contributes to the overall picture of your life.
						</p>
					</div>
				</div>

				<div className="w-full text-center text-base lg:px-44 px-8 text-black mt-16 mb-6">
					Your responses and the ratings you provide at the end of each section
					will come together to form a comprehensive "Wheel of Life" with twelve
					areas. This visual representation will serve as both a mirror and a
					map-a mirror reflecting your current state across various dimensions
					of life and a map guiding you towards greater balance, fulfillment,
					and alignment with your values and goals.
				</div>

				<div className="w-full text-center text-base lg:px-44 px-8 text-black mb-14">
					Remember, there's no prescribed way to navigate this exploration. The
					aim is to offer insights and provoke thought, encouraging you to see
					yourself more clearly and chart a course towards your definition of
					success and happiness. Let's embark on this enlightening journey
					together, with openness, curiosity, and a readiness to uncover the
					richness and potential of your life's many facets.
				</div>
				<div className="m-10">
					<PieChart />
				</div>

				{!signupType || signupType === "User" ? (
					<>
						<div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-14">
							<button
								onClick={handleHealthAndFitnessAssessment}
								className="lg:w-[40%] w-[90%] py-4 lg:px-10 px-6 bg-[#6D00F8] text-white lg:text-lg text-sm font-bold cursor-pointer rounded-md"
							>
								Take Assessment For Health & Fitness
							</button>
							<button
								onClick={handleCulturescopeExplorationAssessment}
								className="lg:w-[40%] w-[90%] py-4 lg:px-10 px-6 bg-[#2187A2] text-white lg:text-lg text-sm font-bold cursor-pointer rounded-md"
							>
								Take Assessment For Culturescape
							</button>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default Homepage;
