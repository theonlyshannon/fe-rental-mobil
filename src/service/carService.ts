"use server";

import { Car } from "@/types/car";

const API_URL = `${process.env.APP_URL ?? "http://localhost:3000"}/cars`;

export const getAllCars = async (): Promise<Car[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  const json = await response.json();
  return json.data;
};

export const getCarById = async (id: number): Promise<Car> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch car with ID ${id}`);
  }
  const json = await response.json();
  return json.data;
};

export const createCar = async (car: Partial<Car>, image?: File): Promise<Car> => {
  const formData = new FormData();
  formData.append("name", car.name || "");
  formData.append("brand_name", car.brand_name || "");
  formData.append("price_per_day", car.price_per_day?.toString() || "");
  formData.append("stock", car.stock || "");
  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create car");
  }

  const json = await response.json();
  return json.data;
};

export const updateCar = async (id: number, car: Partial<Car>, image?: File): Promise<Car> => {
  const formData = new FormData();
  formData.append("name", car.name || "");
  formData.append("brand_name", car.brand_name || "");
  formData.append("price_per_day", car.price_per_day?.toString() || "");
  formData.append("stock", car.stock || "");
  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update car");
  }

  const json = await response.json();
  return json.data;
};

export const deleteCar = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete car");
  }
};
