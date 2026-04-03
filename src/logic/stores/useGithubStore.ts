import {create} from "zustand";

interface GithubStore {
    paths: Record<number, string>;
    setPaths: (paths: Record<number, string>) => void;
}

const useGithubStore = create<GithubStore>((set) => ({
    paths: {},
    setPaths: (paths) => set({ paths: paths }),
}))

export const useGithubStorePaths = () => useGithubStore(state => state.paths);
export const setGithubStorePaths = (paths: Record<number, string>) => useGithubStore.getState().setPaths(paths);