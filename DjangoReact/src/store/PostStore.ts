import { create } from 'zustand';


interface PostQuery {
    categoryId?: number | null;
    sortOrder?: string;
    searchText?: string;
  }


interface PostQueryStore {
    PostQuery: PostQuery;
    setSearchText:(earchText: string) => void;
    setCategoryId: (genreId: number | null) => void;
    setSortOrder: (sortOrder: string) => void;
}

const usePostQueryStore = create<PostQueryStore>(set => ({
    PostQuery: {
        categoryId: null,  // Set initial value to null
        sortOrder: undefined,
        searchText: undefined
    },
    setSearchText: (searchText) => set(() => ({ PostQuery: { searchText} })),
    setCategoryId: (genreId) => set(store => ({ PostQuery: {...store.PostQuery, categoryId: genreId} })),
    setSortOrder: (sortOrder) => set(store => ({ PostQuery: { ...store.PostQuery, sortOrder} })),
}))

export default usePostQueryStore;
