import type {PrototypeReagentsInterface, RecipeReactionsInterface} from "@/config/interfacesAPI.ts";
import {create} from "zustand";

type ChemistryStore = {
    reagents: PrototypeReagentsInterface;
    reactions: RecipeReactionsInterface;
    setReagents: (reagents: PrototypeReagentsInterface) => void;
    setReactions: (reactions: RecipeReactionsInterface) => void;
}

const useChemistryStore = create<ChemistryStore>((set) => (
    {
        reagents: {},
        reactions: {},

        setReagents: (reagents) => {
            set({ reagents: reagents });
        },

        setReactions: (reactions) => {
            set({ reactions: reactions });
        },
    })
);
export const isChemistryStoreReagentsLoaded = () => Object.keys(useChemistryStore.getState().reagents).length !== 0;
export const isChemistryStoreReactionsLoaded = () => Object.keys(useChemistryStore.getState().reactions).length !== 0;

export const useChemistryStoreReagents = () => useChemistryStore(state => state.reagents)
export const useChemistryStoreReactions = () => useChemistryStore(state => state.reactions);
export const setChemistryStoreReagents = (reagents: PrototypeReagentsInterface) => useChemistryStore.getState().setReagents(reagents);
export const setChemistryStoreReactions = (reactions: RecipeReactionsInterface) => useChemistryStore.getState().setReactions(reactions);