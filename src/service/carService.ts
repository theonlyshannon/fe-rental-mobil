"use server";

import { Car } from "@/types/car";

const API_URL = process.env.APP_URL + "/cars";

export const getAllCars = async (): Promise<Car[]> => {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json.data;
};

export const getCarById = async (id: number): Promise<Car> => {
  const response = await fetch(`${API_URL}/${id}`);
  const json = await response.json();
  return json.data;
};

export const createCar = async (car: Partial<Car>): Promise<Car> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  const json = await response.json();
  return json.data;
};

export const updateCar = async (id: number, car: Partial<Car>): Promise<Car> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  const json = await response.json();
  return json.data;
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
