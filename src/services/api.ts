import axios from "axios";
import { CreateGiftDto, Gift, GiftTemplate } from "../types/gift";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const giftApi = {
  // Get all gift templates
  getTemplates: () => api.get<GiftTemplate[]>("/templates"),

  // Create a new gift
  createGift: (giftData: CreateGiftDto) => api.post<Gift>("/gifts", giftData),

  // Get a gift by its ID
  getGift: (id: string, password?: string) =>
    api.get<Gift>(`/gifts/${id}`, {
      headers: password ? { "X-Gift-Password": password } : undefined,
    }),

  // Mark a gift as opened
  markGiftAsOpened: (id: string) => api.patch<Gift>(`/gifts/${id}/open`),
};

export default api;
