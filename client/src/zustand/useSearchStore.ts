import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ISearchParams = {
  categories?: { id: string; label: string }[];
  prices?: number[];
  sizes?: number[];
  province?: { id: string; name: string } | null;
};
type State = {
  searchParams: ISearchParams;
};

type Action = {
  setSearchParams: (value: ISearchParams) => void;
};

const useSearchStore = create<State & Action>()(
  devtools((set, _get) => ({
    searchParams: {
      categories: [],
      prices: [],
      sizes: [],
      province: null
    },
    setSearchParams: (value: ISearchParams) => set(() => ({ searchParams: { ..._get().searchParams, ...value } }))
  }))
);

export default useSearchStore;
