"use server";

import { Reservation } from "@/types/reservation";

const API_URL = process.env.APP_URL ? `${process.env.APP_URL}/reservations` : "/reservations";

export const getAllReservations = async (): Promise<Reservation[]> => {
    try {
        const response = await fetch(API_URL, { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch reservations");
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return [];
    }
};

export const getReservationById = async (id: number): Promise<Reservation | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`Failed to fetch reservation with ID: ${id}`);
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching reservation:", error);
        return null;
    }
};

export const createReservation = async (reservation: FormData): Promise<Reservation | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: reservation,
        });

        if (!response.ok) throw new Error("Failed to create reservation");

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error creating reservation:", error);
        return null;
    }
};

export const updateReservation = async (id: number, reservation: FormData): Promise<Reservation | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT", 
            body: reservation, 
        });

        if (!response.ok) throw new Error(`Failed to update reservation with ID: ${id}`);

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error updating reservation:", error);
        return null;
    }
};

export const deleteReservation = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error(`Failed to delete reservation with ID: ${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return false;
    }
};
