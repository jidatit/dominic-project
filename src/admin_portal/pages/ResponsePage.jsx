import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../db";
import MaxWidthDialog from "../components/MaxWidthDialog";

const Loader = () => (
	<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-75 z-50">
		<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
	</div>
);

const ResponsePage = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				// Fetch user IDs from HFResponses and CEResponses collections
				const hfResponseCollection = collection(db, "HFResponses");
				const hfResponseSnapshot = await getDocs(hfResponseCollection);
				const hfResponseUserIds = new Set(
					hfResponseSnapshot.docs.map((doc) => doc.data().userid),
				);

				const ceResponseCollection = collection(db, "CEResponses");
				const ceResponseSnapshot = await getDocs(ceResponseCollection);
				const ceResponseUserIds = new Set(
					ceResponseSnapshot.docs.map((doc) => doc.data().userid),
				);

				// Combine the IDs from both response collections
				const responseUserIds = new Set([
					...hfResponseUserIds,
					...ceResponseUserIds,
				]);

				// Fetch users
				const userCollection = collection(db, "users");
				const userSnapshot = await getDocs(userCollection);
				const usersData = userSnapshot.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					.filter((user) => responseUserIds.has(user.id)); // Filter users based on response IDs

				setUsers(usersData);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	const columns = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Name",
				size: 100,
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue().length > 100
							? cell.getValue().slice(0, 100) + "..."
							: cell.getValue()}
					</Box>
				),
			},
			{
				accessorKey: "email",
				header: "Email",
				size: 100,
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue().length > 100
							? cell.getValue().slice(0, 100) + "..."
							: cell.getValue()}
					</Box>
				),
			},
			{
				header: "Actions",
				size: 200,
				Cell: ({ row }) => (
					<Box display="flex" alignItems="center" gap="18px">
						<button
							className="bg-[#2187A2] rounded-[18px] px-[26px] py-[4px] font-semibold text-white text-[14px]"
							onClick={() => handleViewResponse(row.original)}
						>
							View Response
						</button>
					</Box>
				),
			},
		],
		[],
	);

	const handleViewResponse = (user) => {
		setSelectedUser(user);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setSelectedUser(null);
	};

	return (
		<>
			<div className="w-full flex flex-col justify-center items-center px-10">
				<div className="w-full flex mb-[20px] flex-col justify-center items-start">
					<h1 className="font-bold text-[24px]">Responses</h1>
				</div>
				<div className="w-full flex flex-col justify-center items-center">
					{users.length > 0 ? (
						<div className="table w-full">
							<MaterialReactTable columns={columns} data={users} />
						</div>
					) : (
						<Loader />
					)}
				</div>
			</div>
			{selectedUser && (
				<MaxWidthDialog
					open={dialogOpen}
					onClose={handleCloseDialog}
					user={selectedUser}
				/>
			)}
		</>
	);
};

export default ResponsePage;
