import { create } from "zustand"
import { getCookie, setPermaCookie } from '@/logic/cookie';
import {stringToBoolean} from '@/logic/utils';
import type {RepositoryInterface} from "@/config/interfaces.ts";



type RepositoryList = {
    repositories: Record<number, RepositoryInterface>;
    setRepositories: (repositories: Record<number, RepositoryInterface>) => void;
}
export const useRepositoryList = create<RepositoryList>((set) => ({
    repositories: {},
    setRepositories: (repositories) => set({ repositories: repositories }),
}))



type Chemistry = {
    reagents: any[];
    reactions: any[];
    addReagents: (repository_id: number, reagents) => void;
    addReactions: (repository_id: number, reactions) => void;
}

export const useChemistry = create<Chemistry>((set) => ({
    reagents: [],
    reactions: [],
    addReagents: (repository_id, reagents) => set(state => ({
        reagents: {
            ...state.reagents,
            [repository_id]: reagents
        }
    })),
    addReactions: (repository_id, reactions) => set( state => ({
        reactions: {
            ...state.reactions,
            [repository_id]: reactions
        }
    })),
}))








// CALCULATOR GLOBALS VARS

type ChemistryCalcChosenBeaker = {
    beaker: string;
    setBeaker: (beaker: string) => void;
}
export const useChemistryCalcChosenBeaker = create<ChemistryCalcChosenBeaker>((set) => ({
    beaker: getCookie('chosen_beaker') || 'large',
    setBeaker: (beaker) => {
        setPermaCookie("chosen_beaker", beaker)
        set({ beaker: beaker })
    },
}))


type ChemistryCalcChosenMethod = {
    method: string;
    setMethod: (mode: string) => void;
}
export const useChemistryCalcChosenMethod = create<ChemistryCalcChosenMethod>((set) => ({
    method: getCookie('chemistry_method') || 'optimal',
    setMethod: (method) => {
        setPermaCookie("chemistry_chosen_method", method)
        set({ method: method })
    },
}))


type ChemistryCalcChosenReactionId = {
    reaction_id: string | null;
    setRecationId: (reaction_id: string) => void;
}
export const useChemistryCalcChosenReactionId = create<ChemistryCalcChosenReactionId>((set) => ({
    reaction_id: null,
    setRecationId: (reaction_id) => set({ reaction_id: reaction_id }),
}))


type ChemistryCalcChosenAmount = {
    amount: number;
    setAmount: (amount: number) => void;
}
export const useChemistryCalcChosenAmount = create<ChemistryCalcChosenAmount>((set) => ({
    amount: 0,
    setAmount: (amount) => set({ amount: amount || 0 }),
}))








// MAPING
type Maps = {
    chosenMap: string | undefined;
    setChosenMap: (mapName: string) => void;
    maps: any[];
    mapsData: any[];
    addMaps: (repository_id: number, maps: any[]) => void;
    addMapsData: (repository_id: number, mapName: string, mapData) => void;
}
export const useMaps = create<Maps>((set) => ({
    chosenMap: undefined,
    setChosenMap: (mapName) => set({ chosenMap: mapName }),

    maps: [],
    addMaps: (repository_id, maps) => set(state => ({
        maps: {
            ...state.maps,
            [repository_id]: maps
        }
    })),
    mapsData: [],
    addMapsData: (repository_id, mapName, mapData) => set(state => ({
        mapsData: {
            ...state.mapsData,
            [repository_id]: {
                ...state.mapsData[repository_id],
                [mapName]: mapData
            }
        }
    })),
}))

type Sprites = {
    tileSprites: any[];
    addTileSprites: (repository_id: number, sprites: any[]) => void;
    entitySprites: any[];
    addEntitySprites: (repository_id: number, sprites: any[]) => void;
    decalSprites: any[];
    addDecalSprites: (repository_id: number, sprites: any[]) => void;
}
export const useSprites = create<Sprites>((set) => ({
    tileSprites: [],
    addTileSprites: (repository_id, sprites) => set(state => ({
        tileSprites: {
            ...state.tileSprites,
            [repository_id]: {
                ...state.tileSprites[repository_id],
                sprites
            }
        }
    })),
    entitySprites: [],
    addEntitySprites: (repository_id, sprites) => set(state => ({
        entitySprites: {
            ...state.entitySprites,
            [repository_id]: {
                ...state.entitySprites[repository_id],
                sprites
            }
        }
    })),
    decalSprites: [],
    addDecalSprites: (repository_id, sprites) => {
        set(state => ({
            decalSprites: {
                ...state.decalSprites,
                [repository_id]: {
                    ...state.decalSprites[repository_id],
                    sprites
                }
            }
        }))
    }
}))










// PARALLAX
type BackgroundSpaceParallaxOffset = {
    animation: boolean
    background: number;
    noise: number;
    setAnimation: (animation: boolean) => void;
    setBackground: (background: number) => void;
    setNoise: (noise: number) => void;
}
export const useBackgroundSpaceParallaxOffset = create<BackgroundSpaceParallaxOffset>((set) => ({
    animation: stringToBoolean(getCookie('parallax_animation')) ?? true,
    background: 0,
    noise: 0,
    setAnimation: (animation) => {
        setPermaCookie("parallax_animation", animation)
        set({ animation: animation })
    },
    setBackground: (background) => set({ background: background }),
    setNoise: (noise) => set({ noise: noise }),
}))