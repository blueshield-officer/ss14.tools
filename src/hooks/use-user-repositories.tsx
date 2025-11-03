import {create} from "zustand/index";
import {parseJsonIfExist} from "@/logic/utils.ts";

type UserRepositories = {
    chosen: number;
    favorite: number[]
    setChosen: (id: number) => void;
    changeFavorite: (id: number, action: string) => void;
}

const useUserRepositories = create<UserRepositories>((set, get) => (
    {
        chosen: parseInt(localStorage.getItem('chosen_build_id') as string) || 0,
        favorite: parseJsonIfExist(localStorage.getItem('favorite_builds_id') as string),
        setChosen: (id) => {
            localStorage.setItem('chosen_build_id', String(id));
            set({ chosen: id })
        },
        changeFavorite: (id: number, action: string) => {
            const favorities_array = get().favorite; // Get current state
            if (action === 'remove') {
                const index = favorities_array.indexOf(id);
                if (index > -1) {
                    favorities_array.splice(index, 1);
                }
            }
            else {
                favorities_array.push(id)
            }
            localStorage.setItem('favorite_builds_id', JSON.stringify(favorities_array));
            set({ favorite: favorities_array });
        }
    }
))

export function GetChosenRepository(): number
{
    return useUserRepositories(state => state.chosen);
}

export function SetChosenRepository(id: number)
{
    useUserRepositories.getState().setChosen(id)
}