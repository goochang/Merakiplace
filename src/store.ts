import { create } from "zustand";
import { Post } from "./model/Post";
import { persist, createJSONStorage } from 'zustand/middleware';

interface PostState {
  Posts: any[];
  Tab: Boolean;
  Popup: Boolean;
  setTab: (data: Boolean) => void;
  setPopup: (data: Boolean) => void;
  setPostData: (data: any[]) => void;
  resetPostData: (data: any[]) => void;
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
  setPage: (data: number) => void;
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
  hPage: 1,
  sPage: 1,
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
  resetPostData: (data) => { // 검색시 초기화
    set((state) => ({
      Posts: [...data]
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
  setPage: (data) => {
    set((state) => {
      if (state.Tab) {
        return { hPage: data }; // 홈
      } else {
        return { sPage: data }; // 스크랩
      }
    });
  },
  setPageUp: () => {
    set((state) => {
      if (state.Tab) {
        return { hPage: state.hPage + 1 }; // 홈
      } else {
        return { sPage: state.sPage + 1 }; // 스크랩
      }
    });
  },
}));

interface PersistState {
  Scrabs: any[];
  setScrabsData: (data: any) => void;
}
export const useStorePersist = create<PersistState>()(
  persist(
    (set, get) => ({
      Scrabs: [],
      setScrabsData: (data: any) => {
        const isInArray = get().Scrabs.some(scrab => scrab._id === data._id);
        if(isInArray){ // 스크랩 삭제
          set((state: { Scrabs: any; }) => ({
            Scrabs: state.Scrabs.filter((scrab: { _id: any; }) => scrab._id !== data._id),
          }));
        } else {    // 스크랩
          set((state: { Scrabs: any; }) => ({
            Scrabs: [...state.Scrabs, data],
          }));
        }
      },
    }),
    {
      name: 'nyt-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ Scrabs: state.Scrabs }),
    }
  )
)

// export const useStorePersist = create<PersistState>(
//   persist(
//     (set) => ({
//       Scrabs: [], // 초기 상태
//       // 다른 상태 필드 초기값을 설정할 수 있습니다.
//     }),
//     {
//       name: 'my-zustand', // 로컬 스토리지에 저장될 키 이름
//       get: ['Scrabs'], // 필요한 상태 필드를 선택적으로 저장
//     }
//   )
// );
// export const useStorePersist = create<PersistState>(persist(set) => ({
//   Scrabs: [],
//   setScrabsData: (data) => {
//     set((state) => ({
//       Scrabs: [...state.Scrabs, data]
//     }));
//   },
// }
// )
// )