export interface Reservation {
    id: number;
    user: {
      id: number;
      name: string;
    };
    car: {
      id: number;
      name: string;
      brand_name: string;
    };
    start_date: string;
    end_date: string;
    proof_of_payment: string | null;
    payment_status: string;
    status: string;
  }
  