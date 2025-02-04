"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/service/userService";
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

export default function AddUserPage() {
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null); // Tambahkan referensi untuk password

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!nameRef.current || !emailRef.current || !passwordRef.current) return; // Periksa password

        await createUser({
            name: nameRef.current.value,
            email: emailRef.current.value, // Perbaiki email yang diambil
            password: passwordRef.current.value, // Tambahkan password
        });

        router.push("/users"); // Redirect ke daftar users setelah submit
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
                                <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Add User</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="p-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Add User</h2>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <input ref={nameRef} type="text" placeholder="Name" className="border p-2 w-full" required />
                            <input ref={emailRef} type="email" placeholder="Email" className="border p-2 w-full" required />
                            <input ref={passwordRef} type="password" placeholder="Password" className="border p-2 w-full" required /> {/* Tambahkan input untuk password */}
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Add User
                                </button>
                                <button onClick={() => router.push("/users")} className="bg-gray-500 text-white px-4 py-2 rounded">
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
