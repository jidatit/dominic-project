import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../db";

const Loader = () => (
	<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-75 z-50">
		<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
	</div>
);

const MaxWidthDialog = ({ open, onClose, user }) => {
	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState("xl");
	const [tabIndex, setTabIndex] = React.useState(0);
	const [healthQuestions, setHealthQuestions] = React.useState([]);
	const [cultureQuestions, setCultureQuestions] = React.useState([]);
	const [healthResponses, setHealthResponses] = React.useState([]);
	const [cultureResponses, setCultureResponses] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	React.useEffect(() => {
		const fetchQuestionsAndResponses = async () => {
			setLoading(true);
			setError(null);

			try {
				const healthQCollection = collection(db, "HFQuestions");
				const healthQSnapshot = await getDocs(healthQCollection);
				setHealthQuestions(healthQSnapshot.docs.map((doc) => doc.data()));

				const cultureQCollection = collection(db, "CEQuestions");
				const cultureQSnapshot = await getDocs(cultureQCollection);
				setCultureQuestions(cultureQSnapshot.docs.map((doc) => doc.data()));

				const healthRCollection = query(
					collection(db, "HFResponses"),
					where("userid", "==", user.id),
				);
				const healthRSnapshot = await getDocs(healthRCollection);
				setHealthResponses(healthRSnapshot.docs.map((doc) => doc.data()));

				const cultureRCollection = query(
					collection(db, "CEResponses"),
					where("userid", "==", user.id),
				);
				const cultureRSnapshot = await getDocs(cultureRCollection);
				setCultureResponses(cultureRSnapshot.docs.map((doc) => doc.data()));
			} catch (error) {
				setError("Error fetching questions and responses. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			fetchQuestionsAndResponses();
		}
	}, [user]);

	const renderResponses = (questions, responses) => {
		return questions.map((question, questionIndex) => {
			const response = responses[0]?.answers?.[questionIndex];
			const currentValue = response?.current || "No response available";
			const currentValueNumber =
				typeof currentValue === "number" ? currentValue : null;

			return (
				<Box
					key={questionIndex}
					mb={2}
					p={2}
					border={1}
					borderColor="divider"
					borderRadius={1}
				>
					<p>
						<strong>Question:</strong> {question.question}
					</p>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection="row"
						mb={2}
					>
						{/* Current Section */}
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							flexDirection="row"
							mb={2}
						>
							{/* Current Section */}
							<Box flex={1} textAlign="center" mr={4}>
								<Box mb={1}>
									<strong>Current</strong>
								</Box>
								<Box
									display="inline-block"
									width="80px" // Adjust the width as needed
									className={`border-2 rounded-md ${
										response?.current < 3
											? "bg-red-500"
											: response?.current < 6
												? "bg-blue-500"
												: "bg-green-500"
									} text-white text-center p-1`}
								>
									{response?.current || "No response available"}
								</Box>
							</Box>

							{/* Desired Section */}
							<Box flex={1} textAlign="center">
								<Box mb={1}>
									<strong>Desired</strong>
								</Box>
								<Box
									display="inline-block"
									width="80px" // Adjust the width as needed
									className={`border-2 rounded-md ${
										response?.desired < 4
											? "bg-red-500"
											: response?.desired < 7
												? "bg-blue-500"
												: "bg-green-500"
									} text-white text-center p-1`}
								>
									{response?.desired || "No response available"}
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			);
		});
	};

	return (
		<React.Fragment>
			<Dialog
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open}
				onClose={onClose}
			>
				<DialogTitle>{user.name}'s Response</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Here are the details for {user.name}:
					</DialogContentText>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={tabIndex}
							onChange={handleTabChange}
							aria-label="user responses tabs"
						>
							<Tab label="Health and Fitness" />
							<Tab label="Culterscape" />
						</Tabs>
					</Box>
					<Box sx={{ p: 3 }}>
						{loading ? (
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								height="100%"
							>
								<CircularProgress />
							</Box>
						) : error ? (
							<Alert severity="error">{error}</Alert>
						) : (
							<>
								{tabIndex === 0 && (
									<Box>
										<h2>Health and Fitness Questions and Responses:</h2>
										{healthQuestions.length === 0 ? (
											<Alert severity="info">
												No health and fitness questions available.
											</Alert>
										) : (
											renderResponses(healthQuestions, healthResponses)
										)}
									</Box>
								)}
								{tabIndex === 1 && (
									<Box>
										<h2>Culterscape Questions and Responses:</h2>
										{cultureQuestions.length === 0 ? (
											<Alert severity="info">
												No Culterscape questions available.
											</Alert>
										) : (
											renderResponses(cultureQuestions, cultureResponses)
										)}
									</Box>
								)}
							</>
						)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default MaxWidthDialog;
