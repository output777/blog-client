import {create} from 'zustand';

interface UrlParamsNicknameStoreProps {
  nickname: string;
  setNickname: (newValue: string) => void;
}

export const useUrlParamsNicknameStore = create<UrlParamsNicknameStoreProps>((set) => ({
  nickname: '',
  setNickname: (newValue: string) => set({nickname: newValue}),
}));
