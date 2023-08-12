import { create } from 'zustand';


interface PostQuery {
    categoryId?: number;
    sortOrder?: string;
    searchText?: string;
  }


interface PostQueryStore {
    PostQuery: PostQuery;
    setSearchText:(earchText: string) => void;
    setCategoryId: (genreId: number) => void;
    setSortOrder: (sortOrder: string) => void;
}

const usePostQueryStore = create<PostQueryStore>(set => ({
    PostQuery: {},
    setSearchText: (searchText) => set(() => ({ PostQuery: { searchText} })),
    setCategoryId: (genreId) => set(store => ({ PostQuery: {...store.PostQuery, categoryId: genreId} })),
    setSortOrder: (sortOrder) => set(store => ({ PostQuery: { ...store.PostQuery, sortOrder} })),
}))

export default usePostQueryStore;
