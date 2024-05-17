import {create} from 'zustand';

interface MobileCategoryStoreProps {
  mobileCategoryActive: boolean;
  setMobileCategoryActive: (newValue: boolean) => void;
}

export const useMobileCategoryStore = create<MobileCategoryStoreProps>((set) => ({
  mobileCategoryActive: false,
  setMobileCategoryActive: (newValue: boolean) => set({mobileCategoryActive: newValue}),
}));
