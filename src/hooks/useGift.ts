import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchTemplates,
  createGift,
  fetchGift,
  clearCurrentGift,
  clearError,
} from "../store/slices/giftSlice";
import type { CreateGiftDto } from "../types/gift";

export const useGift = () => {
  const dispatch = useAppDispatch();
  const { templates, currentGift, loading, error } = useAppSelector(
    (state) => state.gift
  );

  const getTemplates = useCallback(async () => {
    await dispatch(fetchTemplates());
  }, [dispatch]);

  const sendGift = useCallback(
    async (giftData: CreateGiftDto) => {
      const result = await dispatch(createGift(giftData));
      if (createGift.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  const getGift = useCallback(
    async (id: string, password?: string) => {
      const result = await dispatch(fetchGift({ id, password }));
      if (fetchGift.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  const resetGift = useCallback(() => {
    dispatch(clearCurrentGift());
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    templates,
    currentGift,
    loading,
    error,
    // Actions
    getTemplates,
    sendGift,
    getGift,
    resetGift,
    resetError,
  };
};
