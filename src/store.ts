import { create } from "zustand";
import { Post } from "./model/Post";

interface PostState {
    Posts: any[];
    Tab: Boolean;
    Popup: Boolean;
    setTab: (data: Boolean) => void;
    setPopup: (data: Boolean) => void;
    setPostData: (data: Post) => void;
    resetPostData: (data: Post) => void;
    
}
export const useStore = create<PostState>((set) => ({
    Posts: [],
    Tab: true,
    Popup: false,
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
      // set((state:any) => ({...state, ...data})); // 무한스크롤 고려

      set((state) => ({
        Posts: [...state.Posts, data]
      }));
    },
    resetPostData: (data) => {
      // set((state:any) => ({...state, ...data})); // 무한스크롤 고려

      set((state) => ({
        Posts: [data]
      }));
    },
  }));