import {create} from "zustand";
import type {ChemistryAction} from "@/types/enums.ts";

interface ChemistryCalculatorDisplay
{
    actions: ChemistryAction[] | null,
    setActions: (actions: ChemistryAction[] | null) => void,

    error: boolean,
    setError: (status: boolean) => void,

    message: string | null
    setMessage: (message: string | null) => void,
}

const useChemistryCalculatorDisplay = create<ChemistryCalculatorDisplay>((set) => ({
    actions: null,
    setActions: (actions) => set({actions: actions }),

    error: false,
    setError: (error) => set({ error: error }),

    message: null,
    setMessage: (message) => set({ message: message }),
}));

export const useChemistryCalculatorDisplayActions = () => useChemistryCalculatorDisplay(state => state.actions);
export const setChemistryCalculatorDisplayActions = (actions: ChemistryAction[] | null) => useChemistryCalculatorDisplay.getState().setActions(actions);
export const useChemistryCalculatorDisplayError = () => useChemistryCalculatorDisplay(state => state.error);
export const setChemistryCalculatorDisplayError = (error: boolean) => useChemistryCalculatorDisplay.getState().setError(error);

export const useChemistryCalculatorDisplayMessage = () => useChemistryCalculatorDisplay(state => state.message);
export const setChemistryCalculatorDisplayMessage = (message: string) => useChemistryCalculatorDisplay.getState().setMessage(message);
