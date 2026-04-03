import {create} from "zustand";
import {STORAGE_KEYS} from "@/constants/storage.keys.ts";
import storage from "@/utils/storage.ts";
import {ChemistryBeaker, ChemistryMode} from "@/types/enums.ts";

interface IChemistryCalculatorSettings {
    chemistryMode: ChemistryMode;
    setChemistryMode: (mode: ChemistryMode) => void;

    chemistryBeaker: ChemistryBeaker;
    setChemistryBeaker: (beaker: ChemistryBeaker) => void;

    chemistryReactionId: string | null;
    setChemistryReactionId: (reactionId: string | null) => void;

    chemistryAmount: number;
    setChemistryAmount: (amount: number) => void;
}

const useChemistryCalculatorSettings = create<IChemistryCalculatorSettings>((set) => ({
    chemistryMode: (storage.get(STORAGE_KEYS.CHEMISTRY_MODE) as ChemistryMode) ?? ChemistryMode.Optimal,
    setChemistryMode: (mode) => {
        storage.set(STORAGE_KEYS.CHEMISTRY_MODE, mode);
        set({chemistryMode: mode })
    },

    chemistryBeaker: (storage.get(STORAGE_KEYS.CHEMISTRY_BEAKER) as ChemistryBeaker) ?? ChemistryBeaker.Large,
    setChemistryBeaker: (beaker) => {
        storage.set(STORAGE_KEYS.CHEMISTRY_BEAKER, beaker);
        set({chemistryBeaker: beaker})
    },

    chemistryReactionId: null,
    setChemistryReactionId: (reactionId) => set({chemistryReactionId: reactionId}),

    chemistryAmount: 100,
    setChemistryAmount: (amount) => set({chemistryAmount: amount}),
}));

export const useChemistryCalculatorSettingsMode = () => useChemistryCalculatorSettings(state => state.chemistryMode);
export const setChemistryCalculatorSettingsMode = (mode: ChemistryMode) => useChemistryCalculatorSettings.getState().setChemistryMode(mode);

export const useChemistryCalculatorSettingsBeaker = () => useChemistryCalculatorSettings(state => state.chemistryBeaker);
export const setChemistryCalculatorSettingsBeaker = (beaker: ChemistryBeaker) => useChemistryCalculatorSettings.getState().setChemistryBeaker(beaker);

export const useChemistryCalculatorSettingsReactionId = () => useChemistryCalculatorSettings(state => state.chemistryReactionId);
export const setChemistryCalculatorSettingsReactionId = (reactionId: string | null) => useChemistryCalculatorSettings.getState().setChemistryReactionId(reactionId);

export const useChemistryCalculatorSettingsAmount = () => useChemistryCalculatorSettings(state => state.chemistryAmount);
export const setChemistryCalculatorSettingsAmount = (amount: number) => useChemistryCalculatorSettings.getState().setChemistryAmount(amount);