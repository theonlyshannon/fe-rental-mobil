"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllUsers, deleteUser } from "@/service/userService";
import { User } from "@/types/user";

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    const handleDelete = async (id: number) => {
        await deleteUser(id);
        fetchUsers();
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <Link href="/users/add">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
                </Link>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">
                                <Link href={`/users/${user.id}/edit/`}>
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(user.id)}
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
