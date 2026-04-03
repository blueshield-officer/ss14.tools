import {create} from "zustand";
import {STORAGE_KEYS} from "@/constants/storage.keys.ts";
import storage from "@/utils/storage.ts";

interface Background {
    animation: boolean;
    setAnimation: (state: boolean) => void;
}

const useBackground = create<Background>((set) => ({
    animation: storage.get(STORAGE_KEYS.BACKGROUND_ANIMATION) !== "false",
    setAnimation: (state) => {
        storage.set(STORAGE_KEYS.BACKGROUND_ANIMATION, String(state))
        set({animation: state})
    }
}))

export const useBackgroundAnimation = () => useBackground(state => state.animation);
export const setBackgroundAnimation = (state: boolean) => useBackground.getState().setAnimation(state);