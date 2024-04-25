import {create} from 'zustand';

interface BlogValueProps {
  userId: number | null;
  blogId: number | null;
}

interface BlogStoreProps {
  blogValue: BlogValueProps;
  setBlogValue: (newValue: BlogValueProps) => void;
}

export const useBlogStore = create<BlogStoreProps>((set) => ({
  blogValue: {
    userId: null,
    blogId: null,
  },
  setBlogValue: (newValue: BlogValueProps) => set({blogValue: newValue}),
}));
