"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        localStorage.removeItem("role");
        router.push("/login");
    };

    return (
        <nav className="bg-primary p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link href="/">Rental Mobil</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? '✖' : '☰'}
                    </button>
                </div>
                <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
                    <Link href="/" className="text-white px-4 py-2">Home</Link>
                    <Link href="/car" className="text-white px-4 py-2">Car</Link>
                    <Link href="/reservations" className="text-white px-4 py-2">Reservations</Link>
                    <Link href="/about" className="text-white px-4 py-2">About</Link>
                    <Link href="/login" className="text-white px-4 py-2">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
