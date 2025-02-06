"use client";

import React, { useEffect, useState } from "react";
import { Car } from "@/types/car";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "http://localhost:8000/api/cars";

const CarGrid: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Gagal mengambil data mobil");
      }

      const json = await response.json();
      setCars(json.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="car-section p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center my-20">
        Daftar Mobil
      </h2>
      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden">
            <CardContent className="p-4">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold">{car.name}</h3>
              <p className="text-gray-600">{car.brand_name}</p>
              <p className="text-lg font-semibold mt-2">
                Harga: {car.price_per_day} / hari
              </p>
              <p className="text-sm font-medium mt-2">Unit: {car.stock}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CarGrid;