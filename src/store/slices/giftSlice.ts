import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Gift, GiftTemplate, CreateGiftDto } from "../../types/gift";
import { giftApi } from "../../services/api";

interface GiftState {
  templates: GiftTemplate[];
  currentGift: Gift | null;
  loading: boolean;
  error: string | null;
}

const initialState: GiftState = {
  templates: [],
  currentGift: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchTemplates = createAsyncThunk(
  "gift/fetchTemplates",
  async () => {
    const response = await giftApi.getTemplates();
    return response.data;
  }
);

export const createGift = createAsyncThunk(
  "gift/createGift",
  async (giftData: CreateGiftDto) => {
    const response = await giftApi.createGift(giftData);
    return response.data;
  }
);

export const fetchGift = createAsyncThunk(
  "gift/fetchGift",
  async ({ id, password }: { id: string; password?: string }) => {
    const response = await giftApi.getGift(id, password);
    return response.data;
  }
);

const giftSlice = createSlice({
  name: "gift",
  initialState,
  reducers: {
    clearCurrentGift: (state) => {
      state.currentGift = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTemplates
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch templates";
      })
      // createGift
      .addCase(createGift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGift.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGift = action.payload;
      })
      .addCase(createGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create gift";
      })
      // fetchGift
      .addCase(fetchGift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGift.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGift = action.payload;
      })
      .addCase(fetchGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch gift";
      });
  },
});

export const { clearCurrentGift, clearError } = giftSlice.actions;
export default giftSlice.reducer;
