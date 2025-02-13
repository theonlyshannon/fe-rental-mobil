"use client";

import React, { useEffect, useState } from "react";
import { Car } from "@/types/car";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "http://localhost:8000/api/cars";

const CarSection: React.FC = () => {
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

      {/* Featured Car Carousel */}
      <div className="mb-12">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {cars.map((car, index) => (
              <CarouselItem key={car.id}>
                <Card className="border-none">
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="relative w-full h-64 mb-4">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2">
                      {car.name}
                    </h3>
                    <p className="text-gray-600 text-center">{car.brand_name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

    </section>
  );
};

export default CarSection;