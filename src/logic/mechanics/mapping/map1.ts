import type {CanvasHTMLAttributes} from 'react';
import { PixiCanvas } from '@/logic/mechanics/mapping/pixi';
import { RsiTextureBuilder } from '@/logic/mechanics/mapping/RsiTextureBuilder';
import { powerCablesArray } from '@/logic/mechanics/mapping/variables';
import {
    MappingGetMapsData, MappingResourcesGetDecals,
    MappingResourcesGetEntities,
    MappingResourcesGetTiles,
    MappingResourcesUseDecals,
    MappingResourcesUseEntities,
    MappingResourcesUseTiles,
} from "@/logic/api/apiCache.ts";
import type {
    MappingResourcesDecalsInterface,
    MappingResourcesEntitiesInterface, MappingResourcesEntityInterface,
    MappingResourcesTilesInterface
} from "@/config/interfacesAPI.ts";

export class Mapping {
    repository_id: number;
    mapName: string;

    resources: Record<string, MappingResourcesDecalsInterface | MappingResourcesTilesInterface | MappingResourcesEntitiesInterface | object>
    preloaded: Record<string, object>

    mapJson: Record<string, object>

    entitiesSpritesById: Record<string, object> = {};
    entitiesSpritesByParent: Record<string, object> = {};

    PixiCanvas: any;
    RsiSpriteBuilder: RsiTextureBuilder
    constructor(repository_id: number, mapName: string, canvas: CanvasHTMLAttributes<HTMLCanvasElement>, coordinatesDiv: HTMLDivElement)
    {
        this.repository_id = repository_id;
        this.mapName = mapName;

        this.preloaded = {
            entityMap: {}
        }

        this.PixiCanvas = new PixiCanvas(canvas.current, coordinatesDiv.current);
    }

    setLayerVisibility(layer: string)
    {
        this.PixiCanvas.setLayerVisibility(layer)
    }

    getLayers()
    {
        return this.PixiCanvas.getLayers()
    }

    async loadMapData()
    {
        const mapData = MappingGetMapsData(this.repository_id, this.mapName)

        this.mapJson = {
            entities: mapData.entities,
            decals: mapData.decals,
            tilemap: mapData.tilemap,
            tilemapChunks: mapData.tilemapChunks,
            mapHeight: mapData.meta.mapHeight,
        }

    }

    preloadMap(resources: MappingResourcesEntitiesInterface)
    {
        const whitelistedEntities: Record<string, Record<'layer', string>> = {};
        const preloadedMap: Record<string, Record<string, boolean>> = {
            'structures': {},
            'cablehv': {},
            'cablemv': {},
            'cableapcextension': {}
        }

        for (const entityId of Object.keys(this.mapJson.entities)) {
            if (resources[entityId]){
                let layer: string | null = null

                for (const information of this.mapJson.entities[entityId]) {
                    const position = information.pos;

                    // load if from whitelist
                    if (whitelistedEntities[entityId]) {
                        preloadedMap[whitelistedEntities[entityId].layer][position] = true
                        continue
                    }

                    const sprite_path = resources[entityId].sprite_path ?? null
                    const category = resources[entityId].category.category ?? null
                    const sub_category = resources[entityId].category.sub_category ?? null

                    // structures
                    if (category === 'Structures' &&
                        (
                            (sub_category === 'Walls' ||
                            sub_category === 'Windows') &&
                            (
                                // grille exception
                                !entityId.startsWith('ClockworkGrille') &&
                                !entityId.startsWith('Grille')
                            )
                        )
                    ) {
                        layer = 'structures'
                    }

                    // all power cables
                    if (sprite_path !== null && sub_category === 'Power') {
                        if ((powerCablesArray).includes(entityId)){
                            layer = entityId.toLowerCase()
                        }
                    }

                    // last load
                    if (layer !== null)
                    {
                        preloadedMap[layer][position] = true;
                        whitelistedEntities[entityId] = {layer: layer}
                    }
                }
            }
        }
        this.RsiSpriteBuilder = new RsiTextureBuilder(this.PixiCanvas, preloadedMap)
    }

    async loadTiles() {
        const ids = this.findMissingIdsInResources(MappingResourcesGetTiles(this.repository_id), Object.values(this.mapJson.tilemap))
        if (ids.length !== 0)
        {
            await fetchApiAutomatic(this.repository_id + "/resources/tiles", 'POST', {
                ids: ids
            })
            for (const tileInfo of Object.values(MappingResourcesGetTiles(this.repository_id))) {
                await this.PixiCanvas.loadTexture(tileInfo.tile_id, tileInfo.sprite_path);
            }
        }
    }
    // TODO grouping
    // group up?????
     async loadEntities() {
         await fetchApiAutomatic(this.repository_id + "/resources/entities", 'POST')
    }

    async loadDecals() {
        const ids = this.findMissingIdsInResources(MappingResourcesGetDecals(this.repository_id), Object.keys(this.mapJson.decals))
        if (ids.length !== 0)
        {
            await fetchApiAutomatic(this.repository_id + "/resources/decals", 'POST', {
                ids: ids
            })
        }
    }


    placeTiles(resources: MappingResourcesTilesInterface) {
        Object.keys(this.mapJson.tilemapChunks).forEach((chunkPosition) => {
            const chunkPositionNumber = this.convertStringPositionToObject(chunkPosition)
            const constant_x: number = chunkPositionNumber.x * 16
            let x: number = constant_x
            let y: number = chunkPositionNumber.y * 16
            this.mapJson.tilemapChunks[chunkPosition].forEach((grid) => {
                grid.forEach((tileId) => {
                    const loc_x: number = x
                    const loc_y: number = y
                    const tileStringId: string = this.mapJson.tilemap[tileId]

                    if (tileStringId && tileStringId.toLowerCase() !== 'space')
                    {
                        const layer = resources[tileStringId].is_subfloor === 1 ? 'subfloors' : 'tiles'
                        this.PixiCanvas.drawSprite(tileStringId, layer,  loc_x, loc_y)
                        if (layer === 'tiles') {
                            this.PixiCanvas.drawSprite('Plating', 'subfloors',  loc_x, loc_y)
                        }
                    }
                    x += 1
                })
                y += 1
                x = constant_x
            })
        })
    }

    async placeEntities(resources: MappingResourcesEntitiesInterface) {
        const subCategoryWhitelist = ['Walls', 'Doors', 'Windows', 'Power']

        function entitySpriteFinder(entityObject: MappingResourcesEntityInterface, resources: MappingResourcesEntitiesInterface) : null | string
        {
            for (const parentId of entityObject.parents) {
                if (resources[parentId]) {
                    const parentEntityObject = resources[parentId]
                    const sprite = parentEntityObject.sprite_path
                    if (sprite !== null) return sprite
                    else if (parentEntityObject.parents.length > 0){
                        const parentSprite = entitySpriteFinder(parentEntityObject, resources)
                        if (parentSprite !== null) return parentSprite
                    }
                }
            }
        }

        for (const entityId of Object.keys(this.mapJson.entities)) {
            if (resources[entityId]) {
                let entityObject = resources[entityId]
                if (subCategoryWhitelist.includes(entityObject.category.sub_category)){
                    if (entityObject) {
                        if (entityObject.sprite_path === null) {
                            if (entityObject.parents.length > 0) {
                                const sprite = entitySpriteFinder(entityObject, resourсes)
                                if (sprite !== null) entityObject.sprite_path = sprite
                                else continue;
                            }
                        }

                        for (const entityPositionInfo of this.mapJson.entities[entityId]) {
                            const pos = entityPositionInfo['pos']
                            const rot = entityPositionInfo['rot']

                            let texture
                            let layer = 'structures'
                            let mirror = false
                            let rotate = 0

                            if (entityId.includes('WindowDirectional')){
                                texture = await this.RsiSpriteBuilder.buildDirectionalWindow(entityObject);
                                rotate = rot
                            }
                            else if ((['Walls', 'Windows']).includes(entityObject.category.sub_category)){
                                if (entityId.startsWith('Grille')){
                                    texture = await this.RsiSpriteBuilder.buildGrillTexture(entityObject)
                                }
                                if (entityId.startsWith('Windoors')){
                                    texture = await this.RsiSpriteBuilder.buildWindDoor(entityObject)
                                    rotate = rot
                                }
                                else {
                                    texture = await this.RsiSpriteBuilder.buildStructureTexture(entityObject, pos)
                                    mirror = true
                                }
                                // if (entityObject.category.sub_category === 'Windows') rotate = rot
                            }
                            else if (entityObject.category.sub_category === 'Doors'){
                                texture = await this.RsiSpriteBuilder.buildDoorTexture(entityObject)
                                rotate = rot
                            }
                            else if (entityObject.category.sub_category === 'Power' && powerCablesArray.includes(entityId)){
                                texture = await this.RsiSpriteBuilder.buildPowerTexture(entityObject, pos)
                                mirror = true
                                layer = 'wires'
                            }

                            this.PixiCanvas.drawSprite(texture, layer, pos[0], pos[1], rotate, mirror)

                        }
                    }
                }
            }
        }
    }

    async placeDecals(resources: MappingResourcesDecalsInterface) {
        for (const decalId of Object.keys(this.mapJson.decals)) {
            for (const color of Object.keys(this.mapJson.decals[decalId])) {
                for (const decalMapObject of this.mapJson.decals[decalId][color])
                {
                    const decalObject = resources[decalId];

                    const decalTexture = await this.RsiSpriteBuilder.buildDecal(decalObject, color)
                    for (const position of decalMapObject.pos) {
                        this.PixiCanvas.drawSprite(
                            decalTexture,
                            'decals',
                            position[0],
                            position[1],
                            decalMapObject.rot
                        )
                    }
                }
            }
        }
    }

    private convertStringPositionToObject(chunkPosition: string)
    {
        const chunkPositionArray = chunkPosition.split(',')
        const x = parseInt(chunkPositionArray[0])
        const y = parseInt(chunkPositionArray[1])
        return {x, y}
    }

    private findMissingIdsInResources(resource: MappingResourcesDecalsInterface | MappingResourcesEntitiesInterface | MappingResourcesTilesInterface, ids: string[])
    {
        if (Object.keys(resource).length === 0)
        {
            return ids
        }
        return ids.filter(id => !resource[id])
    }



    // private processRsiSprite(entityId: string, spritePath: string ,category: object[])
    // {
    //     const categoryPrimary = category.primary
    //     const categorySub = category.sub
    //
    //     // Doors
    //     if (
    //         categoryPrimary === 'Structures' &&
    //         categorySub === 'Doors'
    //     ) {
    //         let state = 'closed'
    //         const entityIdLower = entityId.toLowerCase()
    //         if (entityIdLower.includes('turnstile')) {
    //             return spritePath + '/turnstile.png'
    //         }
    //         if (
    //             entityIdLower.includes('firelock') ||
    //             entityIdLower.includes('shutter')
    //         ) {
    //             state = 'open'
    //         }
    //         return spritePath + '/' + state + '.png'
    //     }
    //
    //     return null
    // }

    render()
    {
        this.PixiCanvas.renderMap()
    }

    setMapInteractivity()
    {
        this.PixiCanvas.setMapInteractivity()
    }
}
