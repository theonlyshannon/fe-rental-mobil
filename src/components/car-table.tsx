"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCars, deleteCar } from "@/service/carService";
import { Car } from "@/types/car";

export default function CarTable() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const data = await getAllCars();
        setCars(data);
    };

    const handleDelete = async (id: number) => {
        await deleteCar(id);
        fetchCars();
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Car Management</h2>
                <Link href="/cars/add">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Car</button>
                </Link>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Brand</th>
                        <th className="border p-2">Price/Day</th>
                        <th className="border p-2">Stock</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id} className="text-center">
                            <td className="border p-2">{car.id}</td>
                            <td className="border p-2">{car.name}</td>
                            <td className="border p-2">
                                <img src={car.image} alt={car.name} className="w-16 h-16 object-cover mx-auto" />
                            </td>
                            <td className="border p-2">{car.brand_name}</td>
                            <td className="border p-2">{car.price_per_day}</td>
                            <td className="border p-2">{car.stock}</td>
                            <td className="border p-2">
                                <Link href={`/cars/${car.id}/edit/`}>
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(car.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
