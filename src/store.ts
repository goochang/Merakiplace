import create from "zustand";
import { Post } from "./model/Post";

interface PostState {
    Posts: Post[];
    setPostData: (data: Post) => void;
}
export const useStore = create<PostState>((set) => ({
    Posts: [],
    setPostData: (data) => {
      set((state) => ({ ...state, ...data })); // 무한스크롤 고려
    },
  }));