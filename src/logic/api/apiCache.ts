import type {
    MappingResourcesDecalsInterface,
    MappingResourcesEntitiesInterface,
    MappingResourcesTilesInterface,
    MapsInterface,
} from "@/config/interfacesAPI.ts";
import {create} from "zustand";

////////////////////////////////////
//
//          Repositories
//
////////////////////////////////////





////////////////////////////////////
//
//          Chemistry
//
////////////////////////////////////







////////////////////////////////////
//
//          Mapping
//
////////////////////////////////////
type Mapping = {
    maps: Record<number, MapsInterface>
    mapsData: Record<number, Record<string, any[]>>;
    setMaps: (repository_id: number, maps: MapsInterface) => void;
    setMapsData: (repository_id: number, mapName: string, mapData: any[]) => void;
}
const useMapping = create<Mapping>((set) => ({
    maps: {},
    setMaps: (repository_id, maps) => set(state => ({
        maps: {
            ...state.maps,
            [repository_id]: maps
        }
    })),
    mapsData: {},
    setMapsData: (repository_id, mapName, mapData) => set(state => ({
        mapsData: {
            ...state.mapsData,
            [repository_id]: {
                ...state.mapsData[repository_id],
                [mapName]: mapData
            }
        }
    })),
}))

export function MappingUseMaps(repository_id: number)
{
    return useMapping(state => state.maps[repository_id]) || {}
}
export function MappingGetMaps(repository_id: number)
{
    return useMapping.getState().maps[repository_id] || {}
}
export function MappingSetMaps(repository_id: number, maps: MapsInterface)
{
    useMapping.getState().setMaps(repository_id, maps)
}
export function MappingUseMapsData(repository_id: number, mapName: string)
{
    return useMapping(state => state.mapsData[repository_id]?.[mapName]) || {}
}
export function MappingGetMapsData(repository_id: number, mapName: string)
{
    const mapsData = useMapping.getState().mapsData
    if (mapsData[repository_id] === undefined) return {}
    if (mapsData[repository_id][mapName] === undefined) return {}
    return useMapping.getState().mapsData[repository_id][mapName]
}
export function MappingSetMapsData(repository_id: number, mapName: string, mapData: any[])
{
    useMapping.getState().setMapsData(repository_id, mapName, mapData)

}

////////////////////////////////////
//
//          Mapping Resources
//
////////////////////////////////////
type MappingResources =  {
    tiles: MappingResourcesTilesInterface
    setTiles: (repository_id: number, tiles: MappingResourcesTilesInterface) => void

    decals: MappingResourcesDecalsInterface
    setDecals: (repository_id: number, decals: MappingResourcesDecalsInterface) => void

    entities: MappingResourcesEntitiesInterface
    setEntities: (repository_id: number, entities: MappingResourcesEntitiesInterface) => void
}
const useMappingResources = create<MappingResources>((set, get) => ({
    tiles: {},
    setTiles: (repository_id, tiles) => set(state => ({
        tiles: {
            ...state.tiles,
            [repository_id]: {
                ...(state.tiles[repository_id] ?? {}),
                ...tiles
            }
        }
    })),

    decals: {},
    setDecals: (repository_id, decals) => set(state => ({
        decals: {
            ...state.decals,
            [repository_id]: {
                ...(state.decals[repository_id] ?? {}),
                ...decals,
            }
        }
    })),

    entities: {},
    setEntities: (repository_id: number, entities: MappingResourcesEntitiesInterface) => set(state => ({
        entities: {
            ...state.entities,
            [repository_id]: {
                ...(state.entities[repository_id] ?? {}),
                ...entities,
            }
        }
    }))
}))
export function MappingResourcesGetTiles(repository_id: number) : MappingResourcesTilesInterface
{
    return useMappingResources.getState().tiles[repository_id] ?? {}
}
export function MappingResourcesSetTiles(repository_id: number, tiles: MappingResourcesTilesInterface) : void
{
    useMappingResources.getState().setTiles(repository_id, tiles)
}
export function MappingResourcesUseTiles(repository_id: number) : MappingResourcesTilesInterface
{
    return useMappingResources(state => state.tiles[repository_id]) ?? {} as MappingResourcesTilesInterface
}
export function MappingResourcesGetDecals(repository_id: number) : MappingResourcesDecalsInterface
{
    return useMappingResources.getState().decals[repository_id] ?? {} as MappingResourcesDecalsInterface
}
export function MappingResourcesSetDecals(repository_id: number, decals: MappingResourcesDecalsInterface) : void
{
    useMappingResources.getState().setDecals(repository_id, decals)
}
export function MappingResourcesUseDecals(repository_id: number) : MappingResourcesDecalsInterface
{
    return useMappingResources(state => state.decals[repository_id]) ?? {} as MappingResourcesDecalsInterface
}
export function MappingResourcesGetEntities(repository_id: number) : MappingResourcesEntitiesInterface
{
    return useMappingResources.getState().entities[repository_id] ?? {} as MappingResourcesEntitiesInterface
}
export function MappingResourcesSetEntities(repository_id: number, entities: MappingResourcesEntitiesInterface) : void
{
    useMappingResources.getState().setEntities(repository_id, entities)
}
export function MappingResourcesUseEntities(repository_id: number) : MappingResourcesEntitiesInterface
{
    return useMappingResources(state => state.entities[repository_id])
}


////////////////////////////////////
//
//          Paths Id
//
////////////////////////////////////
type Paths = {
    paths: Record<number, Record<number, string>>
    setPaths: (repository_id: number, paths: Record<number, string>) => void;
}
const usePaths = create<Paths>((set) => ({
    paths: {},
    setPaths: (repository_id, paths) => {
        set(state => ({
            paths: {
                ...state.paths,
                [repository_id]: paths
            }
        }))
    }
}))
export function PathsUsePaths(repository_id: number)
{
    return usePaths(state => state.paths[repository_id]) || ""
}
export function PathsSetPaths(repository_id: number, paths: Record<number, string>)
{
    usePaths.getState().setPaths(repository_id, paths)
}