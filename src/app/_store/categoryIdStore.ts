import {create} from 'zustand';

interface CategoryIdStoreProps {
  categoryId: string;
  setCategoryId: (newValue: string) => void;
}

export const useCategoryIdStore = create<CategoryIdStoreProps>((set) => ({
  categoryId: '',
  setCategoryId: (newValue: string) => set({categoryId: newValue}),
}));
