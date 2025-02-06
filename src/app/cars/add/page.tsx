"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createCar } from "@/service/carService";
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

export default function AddCarPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createCar({
                name,
                brand_name: brandName,
                price_per_day: Number(pricePerDay),
                stock
            }, image);
            router.push("/cars"); // Redirect ke daftar mobil
        } catch (error) {
            console.error("Error creating car:", error);
        }
    };

    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         setImage(event.target.files[0]);
    //     }
    // };

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
                                <BreadcrumbPage>Add Car</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
                    <h2 className="text-xl font-bold mb-4">Add New Car</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Car Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Brand Name"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price per Day"
                            value={pricePerDay}
                            onChange={(e) => setPricePerDay(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="border p-2 w-full"
                        />
                        <div className="flex space-x-2">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Add Car
                            </button>
                            <button onClick={() => router.push("/cars")} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
