import {create} from 'zustand';

interface BlogStoreProps {
  blogTitle: string;
  setBlogTitle: (newValue: string) => void;
}

export const useBlogStore = create<BlogStoreProps>((set) => ({
  blogTitle: '',
  setBlogTitle: (newValue: string) => set({blogTitle: newValue}),
}));
