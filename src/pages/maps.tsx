import {useEffect, useRef, useState} from "react";
import {
    MappingGetMapsData, MappingResourcesGetDecals, MappingResourcesGetEntities, MappingResourcesGetTiles,
    MappingUseMaps
} from "@/logic/api/apiCache.ts";
import ContentBlock from "@/components/content-block.tsx";
import {ucwords} from "@/logic/utils.ts";
import ButtonV2 from "@/components/buttonV2.tsx";
import {Mapping} from "@/logic/mechanics/mapping/map1.ts";
import {useChosenRepository} from "@/logic/hooks/useUserRepositories.ts";
import {useLoadedMapResources} from "@/logic/hooks/useLoaded.ts";
import {loadMapResources} from "@/logic/api/dataLoaders.ts";
import {setMapResourcesStoreMap, useMapResourcesStoreMap} from "@/logic/stores/useMapResourcesStore.ts";

export function Maps() {
    const repositoryId = useChosenRepository()
    const mapsLoaded = useLoadedMapResources();

    useEffect(() => {
        if (mapsLoaded) return
        loadMapResources(repositoryId)
    }, [repositoryId, mapsLoaded]);

    const [loaded, setLoaded] = useState(false);

    const maps = MappingUseMaps(repositoryId)
    const chosenMap = useMapResourcesStoreMap()

    const canvasHolderRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const coordinatesRef = useRef<HTMLDivElement>(null);
    const mappingRef = useRef<Mapping>(null)

    const [layers, setLayers] = useState();


    useEffect(() => {
        if (!repositoryId || !chosenMap) return

        (async () => {
            await awaitMapData(repositoryId, chosenMap)

            mappingRef.current = new Mapping(repositoryId, chosenMap, canvasRef, coordinatesRef);

            await mappingRef.current?.loadMapData()

            await mappingRef.current?.loadTiles()
            await mappingRef.current?.loadEntities()
            await mappingRef.current?.loadDecals()

            const entities = MappingResourcesGetEntities(repositoryId)
            const tiles = MappingResourcesGetTiles(repositoryId)
            const decals = MappingResourcesGetDecals(repositoryId)



            mappingRef.current?.preloadMap(entities)

            mappingRef.current?.placeTiles(tiles)
            await mappingRef.current?.placeEntities(entities)
            //mappingRef.current?.placeDecals(decals)

            mappingRef.current?.render()
            setLoaded(true)
            mappingRef.current?.setMapInteractivity()
        })()

        async function awaitMapData(repositoryId: number, chosenMap: string) {
            while (true) {
                const mapData = MappingGetMapsData(repositoryId, chosenMap)
                if (Object.keys(mapData).length !== 0) return
                await new Promise(resolve => setTimeout(resolve, 100))
            }
        }
    }, [repositoryId, chosenMap]);


    return (
            <ContentBlock>
                <div className={'m-2 flex grow-0 overflow-x-auto gap-1'}>
                    {Object.keys(maps).map((mapName) => {
                        const mapParams = maps[mapName]
                        return (
                            <ButtonV2 className={'inline rounded-xl border-2 p-2'} key={Math.random()}
                                      active={chosenMap === mapName} onClick={() => {
                                if (chosenMap !== mapName) setMapResourcesStoreMap(mapName)
                            }}>
                                {ucwords(mapName)}
                            </ButtonV2>
                        )
                    })}
                </div>
                <div ref={canvasHolderRef} className={(loaded ? '' : 'hidden') + ' m-1'}>
                    <div className={'relative'}>
                        <canvas id={'game-map'} ref={canvasRef} className={'block h-full w-full rounded-lg'}></canvas>

                        <div className="absolute bottom-0.5 left-0.5 tabular-nums" ref={coordinatesRef}>
                            testing
                        </div>

                        <div className="absolute top-0 left-0 z-10">
                            <p>Layers:</p>
                            <div className={'flex flex-col'}>
                                {mappingRef.current?.getLayers().map((layer: string) => (
                                    <label>
                                        <input type="checkbox"
                                               onClick={() => mappingRef.current?.setLayerVisibility(layer)}/>
                                        {layer}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ContentBlock>
    );
}

