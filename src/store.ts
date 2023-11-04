import { create } from "zustand";
import { Post } from "./model/Post";

interface PostState {
    Posts: Post[];
    Tab: Boolean;
    setTab: (data: Boolean) => void;
    setPostData: (data: Post) => void;
}
export const useStore = create<PostState>((set) => ({
    Posts: [],
    Tab: true,
    setTab: (data) => {
      set(() => ({
        Tab: data
      }))
    },
    setPostData: (data) => {
      set((state) => ({ ...state, ...data })); // 무한스크롤 고려
    },
  }));