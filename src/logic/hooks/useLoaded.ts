import {create} from "zustand";

interface Loaded {
    repositories: boolean;
    setRepositories: (loaded: boolean) => void;

    chemistry: boolean;
    setChemistry: (loaded: boolean) => void

    mapResources: boolean;
    setMapResources: (loaded: boolean) => void
}

const useLoaded = create<Loaded>((set) => ({
    repositories: false,
    setRepositories: (loaded) => {
        set({ repositories: loaded });
    },

    chemistry: false,
    setChemistry: (loaded) => {
        set({ chemistry: loaded });
    },

    mapResources: false,
    setMapResources: (loaded: boolean) => {
        set({ mapResources: loaded });
    }
}))

export const useLoadedChemistry = () => useLoaded(state => state.chemistry);
export const setLoadedChemistry = (loaded: boolean) => useLoaded.getState().setChemistry(loaded);


export const useLoadedMapResources = () => useLoaded(state => state.mapResources);
export const setLoadedMapResources = (loaded: boolean) => useLoaded.getState().setMapResources(loaded);