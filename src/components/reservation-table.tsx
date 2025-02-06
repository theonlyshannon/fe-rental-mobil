"use client";

import { useEffect, useState } from "react";
import { getAllReservations, deleteReservation } from "@/service/reservationService";
import { Reservation } from "@/types/reservation";
import Link from "next/link";

export default function ReservationTable() {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const data = await getAllReservations();
        setReservations(data || []);
    };

    const handleDelete = async (id: number) => {
        await deleteReservation(id);
        fetchReservations();
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Reservation Management</h2>
                <Link href="/reservations/add">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Reservation</button>
                </Link>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">User</th>
                        <th className="border p-2">Car</th>
                        <th className="border p-2">Start Date</th>
                        <th className="border p-2">End Date</th>
                        <th className="border p-2">Payment Status</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <tr key={reservation.id} className="text-center">
                                <td className="border p-2">{reservation.id}</td>
                                <td className="border p-2">{reservation.user.name}</td>
                                <td className="border p-2">{reservation.car.name} ({reservation.car.brand_name})</td>
                                <td className="border p-2">{reservation.start_date}</td>
                                <td className="border p-2">{reservation.end_date}</td>
                                <td className="border p-2">{reservation.payment_status}</td>
                                <td className="border p-2">{reservation.status}</td>
                                <td className="border p-2">
                                <Link href={`/reservations/${reservation.id}/edit/`}>
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                        Edit
                                    </button>
                                </Link>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(reservation.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="border p-2 text-center">No reservations found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
