import type {
    MappingResourcesDecalsInterface,
    MappingResourcesEntitiesInterface, MappingResourcesTilesInterface,
    MapsInterface
} from "@/config/interfacesAPI.ts";
import {create} from "zustand";

interface MapResourcesStore {
    map: string | null,
    setMap: (map: string | null) => void

    maps: MapsInterface,
    setMaps: (maps: MapsInterface) => void

    entities: MappingResourcesEntitiesInterface
    setEntities: (entities: MappingResourcesEntitiesInterface) => void

    tiles: MappingResourcesTilesInterface
    setTiles: (tiles: MappingResourcesTilesInterface) => void

    decals: MappingResourcesDecalsInterface
    setDecals: (decals: MappingResourcesDecalsInterface) => void
}

const useMapResourcesStore = create<MapResourcesStore>((set => ({
    map: null,
    setMap: (map) => set({map: map}),

    maps: {},
    setMaps: (maps) => set({maps: maps}),

    entities: {},
    setEntities: (entities) => set({ entities: entities}),

    tiles: {},
    setTiles: (tiles) => set({ tiles: tiles }),

    decals: {},
    setDecals: (decals) => set({ decals: decals }),
})))

export const useMapResourcesStoreMap = () => useMapResourcesStore(state => state.map);
export const setMapResourcesStoreMap = (map: string | null) => useMapResourcesStore.getState().setMap(map);

export const useMapResourcesStoreMaps = () => useMapResourcesStore(state => state.maps);
export const setMapResourcesStoreMaps = (maps: MapsInterface) => useMapResourcesStore.getState().setMaps(maps);

export const useMapResourcesStoreEntities = () => useMapResourcesStore(state => state.entities);
export const setMapResourcesStoreEntities = (entities: MappingResourcesEntitiesInterface) => useMapResourcesStore.getState().setEntities(entities);

export const useMapResourcesStoreTiles = () => useMapResourcesStore(state => state.tiles);
export const setMapResourcesStoreTiles = (tiles: MappingResourcesTilesInterface) => useMapResourcesStore.getState().setTiles(tiles);

export const useMapResourcesStoreDecals = () => useMapResourcesStore(state => state.decals);
export const setMapResourcesStoreDecals = (decals: MappingResourcesDecalsInterface) => useMapResourcesStore.getState().setDecals(decals);