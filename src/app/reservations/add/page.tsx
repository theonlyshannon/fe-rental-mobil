"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createReservation } from "@/service/reservationService";
import { getAllUsers } from "@/service/userService";
import { getAllCars } from "@/service/carService";
import { User } from "@/types/user";
import { Car } from "@/types/car";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AddReservationPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const userRef = useRef<HTMLSelectElement>(null);
    const carRef = useRef<HTMLSelectElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus[]>([]);
    const [status, setStatus] = useState<Statusg[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchCars();
        fetchPaymentStatus();
        fetchStatus();
    }, []);

    const fetchPaymentStatus = async () => {
        const data = await getAllPaymentStatus();
        setPaymentStatus(data);
    };

    const fetchStatus = async () => {
        const data = await fetch('/api/status'); 
        const json = await data.json();
        setStatus(json.data);
    };

    const fetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    const fetchCars = async () => {
        const data = await getAllCars();
        setCars(data);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userRef.current || !carRef.current || !startDateRef.current || !endDateRef.current || !paymentStatusRef.current || !statusRef.current) return;

        await createReservation({
            user_id: Number(userRef.current.value),
            car_id: Number(carRef.current.value),
            start_date: startDateRef.current.value,
            end_date: endDateRef.current.value,
            payment_status: paymentStatusRef.current.value,
            status: statusRef.current.value,
        });

        router.push("/reservations"); // Redirect ke daftar reservasi setelah submit
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/reservations">Reservations</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Add Reservation</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="p-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Add Reservation</h2>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <select ref={userRef} className="border p-2 w-full" required>
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <select ref={carRef} className="border p-2 w-full" required>
                                <option value="">Select Car</option>
                                {cars.map((car) => (
                                    <option key={car.id} value={car.id}>
                                        {car.name} ({car.brand_name})
                                    </option>
                                ))}
                            </select>
                            <input ref={startDateRef} type="date" className="border p-2 w-full" required />
                            <input ref={endDateRef} type="date" className="border p-2 w-full" required />
                            <select ref={paymentStatusRef} className="border p-2 w-full" required>
                            {paymentStatus.map((car) => (
                                    <option key={car.id} value={car.id}>
                                        {car.name} ({car.brand_name})
                                    </option>
                                ))}
                            </select>
                            <select ref={statusRef} className="border p-2 w-full" required>
                                <option value="reserved">Reserved</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </select>
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Add Reservation
                                </button>
                                <button onClick={() => router.push("/reservations")} className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
