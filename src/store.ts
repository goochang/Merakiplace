import { create } from "zustand";
import { Post } from "./model/Post";

interface PostState {
    Posts: Post[];
    Tab: Boolean;
    Popup: Boolean;
    setTab: (data: Boolean) => void;
    setPopup: (data: Boolean) => void;
    setPostData: (data: Post) => void;
}
export const useStore = create<PostState>((set) => ({
    Posts: [],
    Tab: true,
    Popup: true,
    setTab: (data) => {
      set(() => ({
        Tab: data
      }))
    },
    setPopup: (data) => {
      set(() => ({
        Popup: data
      }))
    },
    setPostData: (data) => {
      set((state) => ({ ...state, ...data })); // 무한스크롤 고려
    },
  }));