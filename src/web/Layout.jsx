import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;