"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUserById, updateUser } from "@/service/userService";
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

export default function EditUserPage() {
    const router = useRouter();
    const { id } = useParams();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            const user = await getUserById(Number(id));
            if (nameRef.current) nameRef.current.value = user.name;
            if (emailRef.current) emailRef.current.value = user.email;
            setLoading(false);
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!nameRef.current || !emailRef.current) return;

        await updateUser(Number(id), {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current?.value || undefined, // Jika password tidak diisi, tetap gunakan nilai lama
        });

        router.push("/users");
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
                                <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit User</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="p-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <input ref={nameRef} type="text" placeholder="Name" className="border p-2 w-full" required />
                            <input ref={emailRef} type="email" placeholder="Email" className="border p-2 w-full" required />
                            <input ref={passwordRef} type="password" placeholder="New Password (optional)" className="border p-2 w-full" />
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Update User
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
