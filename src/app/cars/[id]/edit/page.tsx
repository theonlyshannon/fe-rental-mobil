"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCarById, updateCar } from "@/service/carService";
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

export default function EditCarPage() {
    const router = useRouter();
    const { id } = useParams();
    const nameRef = useRef<HTMLInputElement>(null);
    const brandRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const stockRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchCar = async () => {
            const car = await getCarById(Number(id));
            if (nameRef.current) nameRef.current.value = car.name;
            if (brandRef.current) brandRef.current.value = car.brand_name;
            if (priceRef.current) priceRef.current.value = car.price_per_day.toString();
            if (stockRef.current) stockRef.current.value = car.stock;
            setLoading(false);
        };

        fetchCar();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!nameRef.current || !brandRef.current || !priceRef.current || !stockRef.current) return;

        await updateCar(Number(id), {
            name: nameRef.current.value,
            brand_name: brandRef.current.value,
            price_per_day: Number(priceRef.current.value),
            stock: stockRef.current.value,
        }, image);

        router.push("/cars");
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    if (loading) return <p>Loading...</p>;

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
                                <BreadcrumbLink href="/cars">Cars</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit Car</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="p-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Edit Car</h2>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <input ref={nameRef} type="text" placeholder="Car Name" className="border p-2 w-full" required />
                            <input ref={brandRef} type="text" placeholder="Brand Name" className="border p-2 w-full" required />
                            <input ref={priceRef} type="number" placeholder="Price per Day" className="border p-2 w-full" required />
                            <input ref={stockRef} type="text" placeholder="Stock" className="border p-2 w-full" required />
                            <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Update Car
                                </button>
                                <button onClick={() => router.push("/cars")} className="bg-gray-500 text-white px-4 py-2 rounded">
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
