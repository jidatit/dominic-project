import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import Layout from "./auth/Layout";
import Login from "./auth/pages/Login";
import Signup from "./auth/pages/Signup";
import Homepage from "./web/pages/Homepage";
import WebLayout from "./web/Layout";
import AdminLayout from "./admin_portal/Layout";
import NotFound from "./web/pages/NotFound";
import AdminLogin from "./auth/pages/AdminLogin";
import UsersPage from "./admin_portal/pages/UsersPage";
import UserLayout from "./user_portal/Layout";
import QuestionsPage from "./admin_portal/pages/QuestionsPage";

import HFResponse from "./web/components/answers/HFResponse";
import HFFinalResult from "./web/components/answers/HFFinalResult";
import CEResponse from "./web/components/answers/CEResponse";
import CEFinalResult from "./web/components/answers/CEFinalResult";
import UserProfile from "./web/components/userProfle/UserProfile";

import RadarChart from "./test/RadarChart";
import CombinedChart from "./test/RadarChart";
import ResponsePage from "./admin_portal/pages/ResponsePage";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/auth" element={<Layout />}>
						<Route index element={<Login />} />
						<Route path="signup" element={<Signup />} />
						<Route path="admin" element={<AdminLogin />} />
					</Route>

					<Route path="/" element={<WebLayout />}>
						<Route index element={<Homepage />} />
						<Route
							path="health-and-fitness-assessment"
							element={<HFResponse />}
						/>
						<Route
							path="health-and-fitness-assessment-final-result"
							element={<HFFinalResult />}
						/>
						<Route
							path="culturescope-exploration-assessment"
							element={<CEResponse />}
						/>
						<Route
							path="culturescope-exploration-assessment-final-result"
							element={<CEFinalResult />}
						/>
						<Route path="user-profile" element={<UserProfile />} />
						<Route path="logout" element={<Logout />} />
					</Route>

					<Route path="/admin_portal" element={<AdminLayout />}>
						<Route index element={<UsersPage />} />
						<Route path="admin_response" element={<ResponsePage />} />
						<Route path="questions" element={<QuestionsPage />} />
						<Route path="logout" element={<Logout />} />
					</Route>

					<Route path="/user_portal" element={<UserLayout />}>
						<Route path="logout" element={<Logout />} />
					</Route>

					<Route path="charts" element={<CombinedChart />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

function Logout() {
	const { logout, signupType } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/");
	};
	return (
		<>
			<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#1F2634] bg-opacity-75">
				<div
					className="w-[654px] h-[310px] rounded-lg mt-[40px] flex flex-col gap-[23px] justify-center items-center"
					style={{ background: "linear-gradient(to right, #ffffff,#fffff8)" }}
				>
					<p className="font-semibold text-black text-2xl text-center">
						Are you sure you want to logout?
					</p>
					<div className="w-[540px] h-[70px] flex flex-row gap-6 justify-center">
						{signupType === "admin" ? (
							<button
								onClick={() => {
									navigate("/admin_portal");
								}}
								className="bg-[#a8222b] rounded-md w-[220px] h-[50px] font-bold text-white"
							>
								Cancel
							</button>
						) : (
							<button
								onClick={() => {
									navigate("/");
								}}
								className="bg-[#a4262e] rounded-md w-[220px] h-[50px] font-bold text-white"
							>
								Cancel
							</button>
						)}
						{signupType === "admin" ? (
							<button
								onClick={logout}
								className="bg-[#6D00F8] rounded-md w-[220px] h-[50px] font-bold text-white"
							>
								Confirm
							</button>
						) : (
							<button
								onClick={handleLogout}
								className="bg-[#6D00F8] rounded-md w-[220px] h-[50px] font-bold text-white"
							>
								Confirm
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
