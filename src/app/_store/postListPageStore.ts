import {create} from 'zustand';

interface PostListPageStoreProps {
  postListPage: number;
  setPostListPage: (newValue: number) => void;
}

export const usePostListPageStore = create<PostListPageStoreProps>((set) => ({
  postListPage: 1,
  setPostListPage: (newValue: number) => set({postListPage: newValue}),
}));
