import {parseJsonIfExist} from "@/logic/utils.ts";
import {STORAGE_KEYS} from "@/constants/storage.keys.ts";
import storage from "@/utils/storage.ts";
import {create} from "zustand";

type UserRepositories = {
    chosen: number | null;
    favorite: number[]
    setChosen: (id: number) => void;
    changeFavorite: (id: number, action: string) => void;
}

const useUserRepositories = create<UserRepositories>((set, get) => (
    {
        chosen: storage.has(STORAGE_KEYS.CHOSEN_REPOSITORY)
            ? parseInt(storage.get(STORAGE_KEYS.CHOSEN_REPOSITORY) as string)
            : null,
        favorite: parseJsonIfExist(storage.get(STORAGE_KEYS.FAVORITE_REPOSITORIES) as string),
        setChosen: (id) => {
            storage.set(STORAGE_KEYS.CHOSEN_REPOSITORY, String(id))
            set({ chosen: id })
        },
        changeFavorite: (id: number, action: string) => {
            const favorites_array = get().favorite; // Get current state
            if (action === 'remove') {
                const index = favorites_array.indexOf(id);
                if (index > -1) {
                    favorites_array.splice(index, 1);
                }
            }
            else {
                favorites_array.push(id)
            }
            storage.set(STORAGE_KEYS.FAVORITE_REPOSITORIES, JSON.stringify(favorites_array))
            set({ favorite: favorites_array });
        }
    }
))

export const getChosenRepository = () => useUserRepositories.getState().chosen;
export const isSetChosenRepository = () => useUserRepositories.getState().chosen !== null
export const useChosenRepository = () => {
    const chosen = useUserRepositories(state => state.chosen)
    if (chosen === null) throw new Error("Chose not found");
    return chosen;
};


export function setChosenRepository(id: number)
{
    useUserRepositories.getState().setChosen(id)
    // TODO clean all old data
}