"use client";

import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="hero bg-cover bg-center h-96" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Sewa Mobil Impian Anda</h1>
                    <p className="text-lg mb-8">Temukan mobil terbaik untuk perjalanan Anda dengan harga terjangkau.</p>
                    <a href="/reservations" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Pesan Sekarang
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
