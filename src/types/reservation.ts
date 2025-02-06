export enum PaymentStatus {
  PENDING = "pending",
  WAITING = "waiting",
  SUCCESS = "success",
}

export enum ReservationStatus {
  PENDING = "pending",
  ON_THE_ROAD = "on_the_road",
  COMPLETED = "completed",
}

export interface Reservation {
  id: number;
  user: number;
  car_id: number;
  start_date: string;
  end_date: string;
  proof_of_payment: string | null;
  payment_status: PaymentStatus;
  status: ReservationStatus;
}
