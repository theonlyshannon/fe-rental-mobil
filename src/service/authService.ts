const API_URL = "http://127.0.0.1:8000/api"; // Sesuaikan dengan backend

export const authService = {
  async register(name: string, email: string, password: string, password_confirmation: string): Promise<void> {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }
  },

  async login(email: string, password: string): Promise<void> {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem("token");

    if (!token) return;

    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
  },

  async getUser(): Promise<User | null> {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  },
};
