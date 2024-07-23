// UserDetailDialog.js
import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Box,
	Paper,
	Grid,
	Avatar,
	Typography,
	IconButton,
} from "@mui/material";

const UserDetailDialog = ({ open, onClose, user }) => {
	if (!user) return null;

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>User Details</DialogTitle>
			<DialogContent>
				<Paper elevation={3} sx={{ p: 4, width: "100%" }}>
					<Grid
						container
						spacing={2}
						sx={{ paddingTop: "10px" }}
						alignItems="center"
						justifyContent="center"
					>
						<Grid item xs={12} md={1} mr={4}>
							<Avatar
								alt={user.name}
								src={user.profilePicture}
								sx={{ width: 56, height: 56, margin: "auto" }}
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							{user.name ? (
								<Typography
									variant="h6"
									align="left"
									style={{
										textAlign: "left",
										paddingLeft: "8px",
										fontWeight: 700,
									}}
								>
									{user.name}
								</Typography>
							) : (
								"No available Data"
							)}
						</Grid>
					</Grid>

					<Grid container spacing={2} style={{ marginTop: 5 }}>
						<Grid item xs={12}>
							{user.email ? (
								<Typography variant="body1">Email: {user.email}</Typography>
							) : (
								"No availble data"
							)}
						</Grid>
					</Grid>

					<Grid container spacing={2} style={{ marginTop: 5 }}>
						<Grid item xs={12}>
							{user.phoneNumber ? (
								<Typography variant="body1">
									Phone number: {user.phoneNumber}
								</Typography>
							) : (
								"No available data"
							)}
						</Grid>
					</Grid>

					<Grid container spacing={2} style={{ marginTop: 5 }}>
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Description :
							</Typography>
							{user.description ? (
								<Typography variant="body1">{user.description}</Typography>
							) : (
								"No available data"
							)}
						</Grid>
					</Grid>
				</Paper>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UserDetailDialog;
