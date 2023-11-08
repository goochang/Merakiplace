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
    hHeadLine: string;
    hDate: Date | null;
    hCountry: any[];
    setHeadLine: (data: string) => void;
    setDate: (data: Date | null) => void;
    setCountry: (data: any[]) => void;
    sHeadLine: string;
    sDate: Date | null;
    sCountry: any[];
}
export const useStore = create<PostState>((set) => ({
    Posts: [],
    Tab: true,
    Popup: false,
    hHeadLine: "",
    hDate: null,
    hCountry: [],
    sHeadLine: "",
    sDate: null,
    sCountry: [],
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
      set((state) => ({
        Posts: [data]
      }));
    },
    setHeadLine: (data) => {
      set((state) => {
        if (state.Tab) {
          return { hHeadLine: data }; // 홈
        } else {
          return { sHeadLine: data }; // 스크랩
        }
      });
    },
    setDate: (data) => {
      set((state) => {
        if (state.Tab) {
          return { hDate: data }; // 홈
        } else {
          return { sDate: data }; // 스크랩
        }
      });
    },
    setCountry: (data) => {
      set((state) => {
        if (state.Tab) {
          return { hCountry: data }; // 홈
        } else {
          return { sCountry: data }; // 스크랩
        }
      });
    },
  }));