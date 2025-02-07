"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createReservation } from "@/service/reservationService";
import { getAllUsers } from "@/service/userService";
import { getAllCars } from "@/service/carService";
import { User } from "@/types/user";
import { Car } from "@/types/car";
import { PaymentStatus, ReservationStatus } from "@/types/reservation";
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
    const [paymentStatuses, setPaymentStatuses] = useState<PaymentStatus[]>([]);
    const [statuses, setStatuses] = useState<ReservationStatus[]>([]);
    const [proofOfPayment, setProofOfPayment] = useState<File | null>(null); // State untuk file

    const userRef = useRef<HTMLSelectElement>(null);
    const carRef = useRef<HTMLSelectElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const paymentStatusRef = useRef<HTMLSelectElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);
    const proofOfPaymentRef = useRef<HTMLInputElement>(null); // Ref untuk file input

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [usersData, carsData] = await Promise.all([getAllUsers(), getAllCars()]);
        setUsers(usersData);
        setCars(carsData);
        setPaymentStatuses(Object.values(PaymentStatus));
        setStatuses(Object.values(ReservationStatus));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setProofOfPayment(event.target.files[0]); // Simpan file ke state
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userRef.current || !carRef.current || !startDateRef.current || !endDateRef.current || !paymentStatusRef.current || !statusRef.current) return;

        const formData = new FormData();
        formData.append("user_id", userRef.current.value);
        formData.append("car_id", carRef.current.value);
        formData.append("start_date", startDateRef.current.value);
        formData.append("end_date", endDateRef.current.value);
        formData.append("payment_status", paymentStatusRef.current.value);
        formData.append("status", statusRef.current.value);
        if (proofOfPayment) {
            formData.append("proof_of_payment", proofOfPayment);
        }

        await createReservation(formData);

        router.push("/reservations");
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
                        <form onSubmit={handleSubmit} className="space-y-2" encType="multipart/form-data">
                            <select ref={userRef} className="border p-2 w-full" required>
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            <select ref={carRef} className="border p-2 w-full" required>
                                <option value="">Select Car</option>
                                {cars.map((car) => (
                                    <option key={car.id} value={car.id}>{car.name} ({car.brand_name})</option>
                                ))}
                            </select>
                            <input ref={startDateRef} type="date" className="border p-2 w-full" required />
                            <input ref={endDateRef} type="date" className="border p-2 w-full" required />
                            <select ref={paymentStatusRef} className="border p-2 w-full" required>
                                {paymentStatuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <select ref={statusRef} className="border p-2 w-full" required>
                                {statuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <input
                                ref={proofOfPaymentRef}
                                type="file"
                                className="border p-2 w-full"
                                accept="image/*,application/pdf"
                                onChange={handleFileChange}
                            />
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Add Reservation
                                </button>
                                <button type="button" onClick={() => router.push("/reservations")} className="bg-gray-500 text-white px-4 py-2 rounded">
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
