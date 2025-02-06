const API_URL = "http://127.0.0.1:8000"; // Sesuaikan dengan backend

interface User {
  id: number;
  name: string;
  email: string;
}

export const authService = {
  // Ambil CSRF token sebelum login/register
  async getCsrfToken(): Promise<void> {
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include", // Penting untuk menyertakan cookie
    });
  },

  async register(name: string, email: string, password: string, password_confirmation: string): Promise<void> {
    try {
      await this.getCsrfToken(); // Ambil CSRF token sebelum register

      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include", // Tambahkan ini agar cookie bisa dikirim
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  },

  async login(email: string, password: string): Promise<void> {
    try {
      await this.getCsrfToken(); // Ambil CSRF token sebelum login

      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include", // Tambahkan agar cookie bisa dikirim
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        credentials: "include", // Pastikan ini ada agar cookie dihapus
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/api/user`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        credentials: "include", // Pastikan ini ada agar cookie dikirim
      });

      if (!response.ok) {
        return null;
      }

      return response.json();
    } catch (error) {
      console.error("Failed to fetch user data", error);
      return null;
    }
  },
};
