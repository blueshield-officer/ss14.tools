import { create } from "zustand"
import {stringToBoolean} from '@/logic/utils';


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
    animation: stringToBoolean(localStorage.getItem('parallax_animation') as string) ?? true,
    background: 0,
    noise: 0,
    setAnimation: (animation) => {
        localStorage.setItem("parallax_animation", String(animation))
        set({ animation: animation })
    },
    setBackground: (background) => set({ background: background }),
    setNoise: (noise) => set({ noise: noise }),
}))