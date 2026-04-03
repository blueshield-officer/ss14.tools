import {create} from "zustand";
import {STORAGE_KEYS} from "@/constants/storage.keys.ts";
import storage from "@/utils/storage.ts";
import {useLayoutEffect} from "react";

const prefersDark = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const mediaQuery = () => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia('(prefers-color-scheme: dark)');
};

const applyTheme = (mode: WebsiteThemeModes) => {
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

const handleSystemThemeChange = () => {
    const currentMode = useWebsiteTheme.getState().mode;
    if (currentMode === 'system') applyTheme('system');
};

export function initializeTheme() {
    const savedMode = storage.get(STORAGE_KEYS.THEME_MODE) as WebsiteThemeModes | null;
    const mode =
        savedMode && ['light', 'dark', 'system'].includes(savedMode) ? savedMode : 'system';
    applyTheme(mode);
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export type WebsiteThemeModes = 'light' | 'dark' | 'system';

type WebsiteThemes = {
    mode: WebsiteThemeModes;
    setMode: (mode: WebsiteThemeModes) => void;
    getTheme: () => 'light' | 'dark';
};

const useWebsiteTheme = create<WebsiteThemes>((set, get) => {
    const storedMode = storage.get(STORAGE_KEYS.THEME_MODE) as WebsiteThemeModes | null;
    const initialMode =
        storedMode && ['light', 'dark', 'system'].includes(storedMode) ? storedMode : 'system';

    if (!storedMode) storage.set(STORAGE_KEYS.THEME_MODE, initialMode);

    return {
        mode: initialMode,
        setMode: (mode) => {
            storage.set(STORAGE_KEYS.THEME_MODE, mode);
            set({ mode });
            applyTheme(mode);
        },
        getTheme: () => {
            const currentMode = get().mode;
            if (currentMode !== 'system') return currentMode;
            return prefersDark() ? 'dark' : 'light';
        },
    };
});

initializeTheme()

export const useTheme = () => useWebsiteTheme(state => state.getTheme())
export const getTheme = () => useWebsiteTheme.getState().getTheme();
export const useMode = () => useWebsiteTheme(state => state.mode);
export const setMode = (mode: WebsiteThemeModes) => useWebsiteTheme.getState().setMode(mode);