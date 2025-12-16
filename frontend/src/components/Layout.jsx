import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
};

export default Layout;
