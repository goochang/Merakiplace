import { create } from "zustand";
import { Post } from "./model/Post";

interface PostState {
    Posts: any[];
    Tab: Boolean;
    Popup: Boolean;
    setTab: (data: Boolean) => void;
    setPopup: (data: Boolean) => void;
    setPostData: (data: any[]) => void;
    resetPostData: (data: Post) => void;
    hHeadLine: string;
    hDate: Date | null;
    hCountry: any[];
    sHeadLine: string;
    sDate: Date | null;
    sCountry: any[];
    setHeadLine: (data: string) => void;
    setDate: (data: Date | null) => void;
    setCountry: (data: any[]) => void;
    hPage: number;
    sPage: number;
    setPageUp: () => void;
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
    hPage:1,
    sPage:1,
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
      set((state) => ({
        Posts: [...state.Posts, ...data]
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
    setPageUp: () => {
      set((state) => {
        if (state.Tab) {
          return { hPage: state.hPage+1 }; // 홈
        } else {
          return { sPage: state.sPage+1 }; // 스크랩
        }
      });
    },
  }));