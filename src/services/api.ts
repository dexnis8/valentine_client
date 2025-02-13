import axios, { AxiosError } from "axios";
import { CreateGiftDto, Gift, GiftTemplate } from "../types/gift";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handler
const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // Rate limit error
    if (error.response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }
    // API validation errors
    if (error.response.status === 400) {
      const data = error.response.data as { errors?: { msg: string }[] };
      if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors.map((e) => e.msg).join(", "));
      }
    }
    // Other API errors
    const data = error.response.data as { message?: string };
    throw new Error(data.message || "An error occurred");
  }
  throw new Error("Network error. Please check your connection.");
};

export const giftApi = {
  // Get all gift templates
  getTemplates: async () => {
    try {
      const response = await api.get<{ status: string; data: GiftTemplate[] }>(
        "/templates"
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Create a new gift
  createGift: async (giftData: CreateGiftDto) => {
    try {
      const response = await api.post<{ status: string; data: Gift }>(
        "/gifts",
        giftData
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Get a gift by its ID
  getGift: async (id: string, password?: string) => {
    try {
      const response = await api.get<{ status: string; data: Gift }>(
        `/gifts/${id}`,
        {
          headers: password ? { "X-Gift-Password": password } : undefined,
        }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Mark a gift as opened
  markGiftAsOpened: async (id: string) => {
    try {
      const response = await api.patch<{ status: string; data: Gift }>(
        `/gifts/${id}/open`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Admin functions (protected by API key)
  admin: {
    createTemplate: async (
      templateData: Omit<GiftTemplate, "_id" | "createdAt" | "updatedAt">
    ) => {
      try {
        const response = await api.post("/templates", templateData, {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_ADMIN_API_KEY,
          },
        });
        return response.data;
      } catch (error) {
        throw handleApiError(error as AxiosError);
      }
    },

    updateTemplate: async (id: string, templateData: Partial<GiftTemplate>) => {
      try {
        const response = await api.patch(`/templates/${id}`, templateData, {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_ADMIN_API_KEY,
          },
        });
        return response.data;
      } catch (error) {
        throw handleApiError(error as AxiosError);
      }
    },

    deleteTemplate: async (id: string) => {
      try {
        const response = await api.delete(`/templates/${id}`, {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_ADMIN_API_KEY,
          },
        });
        return response.data;
      } catch (error) {
        throw handleApiError(error as AxiosError);
      }
    },
  },
};

export default api;
