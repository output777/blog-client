import {create} from 'zustand';

export interface LoadingProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingProps>((set) => ({
  isLoading: false,
  setLoading: (isFetching: boolean) => set({isLoading: isFetching}),
}));
