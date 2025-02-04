"use client";

// import React, { useEffect, useState } from 'react';
// import { Car } from "@/types/car"; // Menambahkan import untuk tipe Car

const CarSection: React.FC = () => {
    // const [cars, setCars] = useState<Car[]>([]); // Mengganti any[] dengan Car[]

    // useEffect(() => {
    //     fetchCars();
    // }, []);

    // const fetchCars = async () => {
    //     const response = await fetch('http://localhost:8000/api/cars'); // Mengubah URL API
    //     const data = await response.json();
    //     setCars(data);
    // };

    // return (
    //     <section className="car-section p-4">
    //         <h2 className="text-2xl font-semibold mb-4">Daftar Mobil</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //             {cars.map((car) => (
    //                 <div key={car.id} className="card border rounded-lg shadow-lg p-4">
    //                     <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-t-lg" />
    //                     <h3 className="text-xl font-bold mt-2">{car.name}</h3>
    //                     <p className="text-gray-600">{car.brand_name}</p>
    //                     <p className="text-lg font-semibold mt-2">Harga: {car.price_per_day} / hari</p>
    //                     <p className="text-lg font-semibold mt-2">Unit: {car.stock}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     </section>
    // );
};

export default CarSection;
