import {create} from 'zustand';

interface PostDataPageStoreProps {
  postDataPage: number;
  setPostDataPage: (newValue: number) => void;
}

export const usePostDataPageStore = create<PostDataPageStoreProps>((set) => ({
  postDataPage: 1,
  setPostDataPage: (newValue: number) => set({postDataPage: newValue}),
}));
