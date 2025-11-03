import {create} from "zustand/index";

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};



type Theme = {
    mode: "light" | "dark" | "system";
    setMode: (mode: "light" | "dark" | "system") => void;
    getTheme: () => "light" | "dark";
}

export const useTheme = create<Theme>((set, get) => {
    const storedMode = localStorage.getItem("theme_mode") as "light" | "dark" | "system" | null;
    const initialMode =
        storedMode && ["light", "dark", "system"].includes(storedMode)
            ? storedMode
            : "system";

    if (!storedMode) localStorage.setItem("theme_mode", initialMode);

    return {
        mode: initialMode,
        setMode: (mode) => {
            localStorage.setItem("theme_mode", mode);
            set({ mode: mode });
            const isDark = mode === 'dark' || (mode === 'system' && prefersDark());
            document.documentElement.classList.toggle('dark', isDark);
        },
        getTheme: () => {
            const currentMode = get().mode;
            if (currentMode !== "system") return currentMode;
            return prefersDark() ? "dark" : "light";
        },
    };
});