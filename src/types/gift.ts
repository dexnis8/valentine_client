export type GiftTheme = "romantic" | "funny" | "friendly" | "cute" | "elegant";

export interface GiftTemplate {
  _id: string;
  message: string;
  theme: GiftTheme;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Gift {
  _id: string;
  templateId: string;
  senderId: string;
  senderName: string;
  customMessage?: string;
  message: string;
  theme: GiftTheme;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
  isOpened: boolean;
  expiresAt?: string;
  hasPassword?: boolean;
}

export interface CreateGiftDto {
  templateId: string;
  senderName: string;
  customMessage?: string;
  scheduledFor?: string;
  password?: string;
  expiresAt?: string;
}
