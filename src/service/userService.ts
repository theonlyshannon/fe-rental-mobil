"use server";

import { User } from "@/types/user";

const API_URL = process.env.APP_URL + "/users";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`);
  const json = await response.json();
  return json.data;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const json = await response.json();
  return json.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const json = await response.json();
  return json.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
