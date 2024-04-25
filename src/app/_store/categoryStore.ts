import {create} from 'zustand';

export interface CategoryProps {
  id: number;
  name: string;
}

interface CateoryStoreProps {
  categoryValue: CategoryProps[];
  setCategoryValue: (newValue: CategoryProps[]) => void;
}

// Zustand 스토어 생성
export const useCategoryStore = create<CateoryStoreProps>((set) => ({
  categoryValue: [],
  setCategoryValue: (newValue: CategoryProps[]) => set({categoryValue: newValue}),
}));
