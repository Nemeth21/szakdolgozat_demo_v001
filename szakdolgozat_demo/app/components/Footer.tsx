"use client"

import React from "react";

const Footer = () => {
    return (
        <footer
            className="w-full font-inter font-mono text-black text-center p-6 bg-white shadow-md"
            style={{
                userSelect: "none", // Lehetővé teszi a szöveg kijelölésének letiltását
                pointerEvents: "none", // Elősegíti, hogy a footer ne reagáljon egérkattintásokra
            }}
        >
            <p className="text-md text-black">© 2025 LIVETHE-FIT. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
