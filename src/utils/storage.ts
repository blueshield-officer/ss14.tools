const PREFIX = import.meta.env.VITE_APP_NAME + '_';

const storage = {
    set: (key: string, value: string) => {
        localStorage.setItem(PREFIX + key, value);
    },

    get: (key: string): string | null => {
        return localStorage.getItem(PREFIX + key);
    },

    has: (key: string): boolean => {
        return localStorage.getItem(PREFIX + key) !== null;
    },

    remove: (key: string) => {
        localStorage.removeItem(PREFIX + key);
    },

    clear: () => {
        localStorage.clear();
    }
};

export default storage;