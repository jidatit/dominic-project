import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../../../../db';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Grid, Typography, Paper, IconButton, Modal, Box, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {

    const user = auth.currentUser;
    const navigate = useNavigate();

    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOpenPasswordModal = () => setOpenPasswordModal(true);
    const handleClosePasswordModal = () => setOpenPasswordModal(false);

    const handlePasswordChange = async () => {
        try {
            if (newPassword !== confirmPassword) {
                toast.error('Passwords do not match.');
                return;
            }

            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            toast.success('Password changed successfully!');
            handleClosePasswordModal();
        } catch (error) {
            toast.error('Error changing password: ' + error.message);
        }
    };

    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        profilePicture: '',
        description: '',
    });
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                const userDoc = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const userCompleteData = userSnapshot.data();
                    setUserInfo(userCompleteData);
                } else {
                    console.error('No such user document!');
                }
            };
            fetchUserData();
        }
    }, [user]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture' && files && files[0]) {
            setNewProfilePicture(files[0]);
            const reader = new FileReader();
            reader.onload = (event) => {
                setUserInfo((prevInfo) => ({
                    ...prevInfo,
                    profilePicture: event.target.result,
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setUserInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
    };

    const handleSave = async () => {
        try {
            if (newProfilePicture) {
                const storageRef = ref(storage, `profile_pictures/${user.uid}`);
                await uploadBytes(storageRef, newProfilePicture);
                const downloadURL = await getDownloadURL(storageRef);
                userInfo.profilePicture = downloadURL;
            }
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, userInfo);
            toast.success('Profile updated successfully!');
            handleClose();
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <ToastContainer />
            {user && user.uid ? (
                <div className="w-full h-auto flex flex-col justify-center items-center gap-8 border-t-2 border-gray-300 py-6">
                    <h1 className="w-full font-bold text-2xl text-center">
                        User Profile
                    </h1>

                    <div className="lg:w-[80%] w-[95%] flex flex-col lg:flex-row justify-center items-start">

                        <div className='lg:w-[65%] w-full lg:px-8 py-4'>
                            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>

                                <Grid container spacing={2} sx={{ paddingTop: '10px' }} alignItems="center" justifyContent="center">
                                    <Grid item xs={12} md={1}>
                                        <Avatar alt={userInfo.name} src={userInfo.profilePicture} sx={{ width: 56, height: 56, margin: 'auto' }} />
                                    </Grid>
                                    <Grid item xs={10} md={10}>
                                        <Typography variant="h6" align="left" style={{ textAlign: 'left', paddingLeft: '8px', fontWeight: 700 }}>
                                            {userInfo.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={1} style={{ textAlign: 'center' }}>
                                        <IconButton onClick={handleOpen}>
                                            <Edit sx={{ fontSize: 30, color: '#6D00F8' }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: 5 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Email: {userInfo.email}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: 5 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Phone number: {userInfo.phoneNumber}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: 5 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Description :
                                        </Typography>
                                        <Typography variant="body1">{userInfo.description}</Typography>
                                    </Grid>
                                </Grid>

                            </Paper>

                            <Modal open={open} onClose={handleClose}>
                                <Box sx={style}>
                                    <Typography variant="h6" gutterBottom>
                                        Edit Profile
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Name"
                                        name="name"
                                        value={userInfo.name}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                        disabled
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Phone"
                                        name="phone"
                                        value={userInfo.phoneNumber}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Description"
                                        name="description"
                                        value={userInfo.description}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                    />
                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#6D00F8',
                                            '&:hover': {
                                                backgroundColor: '#6D00F8',
                                            },
                                        }}
                                        fullWidth
                                    >
                                        Upload Picture
                                        <input
                                            type="file"
                                            hidden
                                            name="profilePicture"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSave}
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#6D00F8',
                                            '&:hover': {
                                                backgroundColor: '#6D00F8',
                                            },
                                        }}
                                        fullWidth
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Modal>
                        </div>

                        <div className='w-full lg:w-[35%] flex flex-col justify-start items-start gap-2 py-4'>
                            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                                <div onClick={handleOpenPasswordModal} className='flex justify-between items-center gap-3 font-semibold text-xl cursor-pointer'>
                                    <p className='text-gray-900'> Change Password </p>
                                    <LockIcon sx={{ fontSize: '20px', color: '#6D00F8' }} />
                                </div>
                            </Paper>
                            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                                <div onClick={() => navigate('/health-and-fitness-assessment')} className='flex justify-between items-center gap-3 font-semibold text-xl cursor-pointer'>
                                    <p className='text-gray-900'> Take Health & Fitness Quiz </p>
                                    <ArrowForwardIosIcon sx={{ fontSize: '20px', color: '#6D00F8' }} />
                                </div>
                            </Paper>
                            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                                <div onClick={() => navigate('/culturescope-exploration-assessment')} className='flex justify-between items-center gap-3 font-semibold text-xl cursor-pointer'>
                                    <p className='text-gray-900'> Take Culturescape Exploration Quiz </p>
                                    <ArrowForwardIosIcon sx={{ fontSize: '20px', color: '#6D00F8' }} />
                                </div>
                            </Paper>
                        </div>

                        <Modal open={openPasswordModal} onClose={handleClosePasswordModal}>
                            <Box sx={style}>
                                <Typography variant="h6" gutterBottom>
                                    Change Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Current Password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Confirm New Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePasswordChange}
                                    sx={{
                                        mt: 2,
                                        backgroundColor: '#6D00F8',
                                        '&:hover': {
                                            backgroundColor: '#6D00F8',
                                        },
                                    }}
                                    fullWidth
                                >
                                    Change Password
                                </Button>
                            </Box>
                        </Modal>

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