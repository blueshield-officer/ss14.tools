import { PixiCanvas } from '@/logic/mechanics/mapping/pixi';
import { Container, Sprite, Texture } from 'pixi.js';
import {array_unique, toBitmask} from '@/logic/utils';

export class RsiTextureBuilder {
    PixiCanvas: PixiCanvas
    preloadedMap: Record<string, Record<string, boolean>>
    metaStates: Record<string, Record<number, string>> = {}
    customSprites: Record<string, boolean> = {}

    constructor(PixiCanvas: PixiCanvas, preloadedMap: Record<string, Record<string, boolean>>) {
        this.preloadedMap = preloadedMap;
        this.PixiCanvas = PixiCanvas;
    }

    public async buildGrillTexture(entityObject)
    {
        return this.PixiCanvas.loadTexture(entityObject.entity_id, entityObject.sprite_path + '/grille.png')
    }

    public async buildStructureTexture(entityObject, pos)
    {
        const neighborMap = this.createNeighbors('structures', pos)

        const blueprint = await this.createTextureBlueprint(entityObject, neighborMap)

        return await this.createSprite(entityObject, blueprint)
    }

    public async buildPowerTexture(entityObject, pos)
    {
        const connectors = [
            [],
            [0],
            [2],
            [0,2],
            [1],
            [0,1],
            [1,2],
            [0,1,2],
            [3],
            [0,3],
            [2,3],
            [0,2,3],
            [1,3],
            [0,1,3],
            [1,2,3],
            [0,1,2,3],
        ]

        const connectorsBitmasks: Record<number, number> = {}
        connectors.forEach((connector, index) => {
            connectorsBitmasks[toBitmask(connector)] = index
        })

        const connectorBitmask = toBitmask(this.createNeighbors(entityObject.entity_id.toLowerCase(), pos, 'index', true))
        const states = await this.getMetaStates(entityObject.entity_id, entityObject.sprite_path, false)

        const longId = `${entityObject.entity_id}${connectorBitmask}`

        if ((['CableApcExtension', 'CableMV'].includes(entityObject.entity_id)) && !this.getCustomSpriteStatus(longId)) {
            let texture: Texture
            if (entityObject.entity_id === 'CableApcExtension'){
                const texturePlain = await this.PixiCanvas.loadTexture(longId, states[connectorsBitmasks[connectorBitmask]], 0, 0, false)
                texture = this.tingTexture(texturePlain, '#008000')
            }
            else if (entityObject.entity_id === 'CableMV'){
                const baseTextureUrl = states[connectorsBitmasks[connectorBitmask]]
                let baseTextureUrlArray: string[] = baseTextureUrl.split('/')
                baseTextureUrlArray[baseTextureUrlArray.length - 1] = baseTextureUrlArray[baseTextureUrlArray.length - 1].replace('mvcable_', 'mvstripes_')
                const stripesTextureUrl = baseTextureUrlArray.join('/')

                let baseTexture = await this.PixiCanvas.loadTexture(longId, baseTextureUrl, 0, 0, false)
                baseTexture = this.tingTexture(baseTexture, '#ffff00')
                const stripesTexture = await this.PixiCanvas.loadTexture(longId, stripesTextureUrl, 0, 0, false)

                const cable = new Container()
                cable.addChild(this.PixiCanvas.createSprite(baseTexture))
                cable.addChild(this.PixiCanvas.createSprite(stripesTexture))

                texture = this.PixiCanvas.convertIntoTexture(cable)
            }
            else {
                texture = await this.PixiCanvas.loadTexture(longId, 'https://server.ss14.tools/storage/images/noSprite.png')
            }
            this.PixiCanvas.rewriteTexture(longId, texture)
            this.customSprites[longId] = true
        }
        return this.PixiCanvas.loadTexture(longId, states[connectorsBitmasks[connectorBitmask]])
    }

    public async buildDecal(decalObject, color: string | null)
    {
        const longId = `${decalObject.decal_id}${color}`
        if (!this.customSprites[longId]){
            let decalTexture = await this.PixiCanvas.loadTexture(longId, decalObject.sprite_path, 0, 0, false)
            if (color !== '') {
                decalTexture = this.tingTexture(decalTexture, color)
            }
            this.customSprites[longId] = true
            this.PixiCanvas.rewriteTexture(longId, decalTexture)
            return decalTexture
        }
        return await this.PixiCanvas.loadTexture(longId)
    }

    public async buildDirectionalWindow(entityObject)
    {
        let windowSpriteName = entityObject.entity_id.toLowerCase()
            .replace('clockwork', 'clock')
            .replace('windowdirectional', '')
            .replace('reinforced', '_reinforced')
            .trim()

        windowSpriteName = (windowSpriteName == "") ? "window" : windowSpriteName + "_window"

        return await this.PixiCanvas.loadTexture(entityObject.entity_id, entityObject.sprite_path + '/' + windowSpriteName + '.png')
    }

    public async buildWindDoor(entityObject)
    {

    }

    public async buildDoorTexture(entityObject)
    {
        const sprite_path = entityObject.sprite_path
        let state = 'closed'
        if (entityObject.entity_id.includes('Firelock', 'Shutter')){
            state = 'open'
        }

        return await this.PixiCanvas.loadTexture(entityObject.entity_id, sprite_path + `/${state}.png`)
    }

    private async createSprite(entityObject, blueprint) {
        const states = await this.getMetaStates(entityObject.entity_id, entityObject.sprite_path)
        const container = new Container({
            scale: 1,
            height: 32,
            width: 32,
        })

        const offsets = [
            {
                x: 0, y: 0
            },
            {
                x: 16, y: 0
            },
            {
                x: 16, y: 16
            },
            {
                x: 0, y: 16
            }
        ]

        for (let i = 0; i < blueprint.length; i++) {
            const position = i
            const side = blueprint[i]


            const isLeft = ([0, 3]).includes(position)
            const isBottom = ([3, 2]).includes(position)
            let offsetX: number = 16
            let offsetY: number = 0
            if (side === 1 || side === 4) {
                offsetY += 16 * 2
                if ((isBottom && side === 4) || (isLeft && side === 1)) {
                    offsetX += 16
                    offsetY += 16
                }
            }
            else {
                if (isLeft) {
                    offsetX += 16
                    if (isBottom) offsetY += 16 * 3
                }
                else {
                    offsetY += 16
                    if (!isBottom) offsetY += 16
                }
            }

            const texture = await this.PixiCanvas.loadTexture(`${entityObject.entity_id}${position}${side}`, states[side], offsetX, offsetY)
            const sprite = new Sprite(texture)
            sprite.texture.source.scaleMode = 'nearest';
            sprite.width = 16;
            sprite.height = 16;
            sprite.x = offsets[position].x
            sprite.y = offsets[position].y
            container.addChild(sprite)
        }

        return this.PixiCanvas.convertIntoTexture(container)
    }

    private createNeighbors(layer: string, pos: Record<number, number>, type: 'index' | 'boolean' = 'boolean', NESW: boolean = false)
    {
        let neighbors
        if (NESW) {
            neighbors = [
                [0,1],
                [1,0],
                [0,-1],
                [-1,0]
            ]
        }
        else {
            neighbors = [
                [-1,1],
                [0,1],
                [1,1],
                [1,0],
                [1,-1],
                [0,-1],
                [-1,-1],
                [-1,0]
            ]
        }

        const neighborMap = []

        for (const [index, neighbor] of neighbors.entries()) {
            let spotTaken: boolean
            if (this.preloadedMap[layer][((pos[0]) + neighbor[0]) + ',' + ((pos[1]) + neighbor[1])])
            {
                spotTaken = true
            }
            else {
                spotTaken = false
            }
            if (type === 'index' && spotTaken) {
                neighborMap.push(index)
            }
            else if (type === 'boolean') {
                neighborMap[index] = spotTaken
            }
        }

        return neighborMap
    }

    tingTexture(texture: Texture, tint: string): Texture
    {
        const sprite = this.PixiCanvas.createSprite(texture)
        //#008000
        // ffff00
        sprite.tint = tint
        return this.PixiCanvas.convertIntoTexture(sprite)
    }

    private async createTextureBlueprint(entityObject, neighborMap)
    {
        const sides = ([0, 2, 4, 6]).map((corner) => {
            const sides = [
                neighborMap[corner + 1],
                neighborMap[corner],
                neighborMap[(corner - 1) < 0 ? 7 : corner - 1]
            ]

            let sidesUnique: object[] | null = array_unique(sides)

            if (sidesUnique.length === 1) {
                return sidesUnique[0] ? 7 : 0

            }
            else {
                if (sides[0] && sides[1] && sides[2]){
                    return 7
                }
                if (sides[0] && sides[2]){
                    return 5
                }
                else if (sides[0]) {
                    return getDirection(corner - 1)
                }
                else if (sides[2]) {
                    return getDirection(corner + 1)
                }
                else {
                    return 0
                }
            }
        })


        function getDirection(side)
        {
            // fixing sides
            if (side === -1) {
                side = 7
            }

            if (([3,7]).includes(side)) {
                return 1
            }
            else {
                return 4
            }
        }

        return sides
    }

    private async getMetaStates(entity_id: string, sprite_path: string, direction4: boolean = true)
    {
        if (this.metaStates[entity_id] === undefined){
            const states: Record<number, string> = {}
            const meta = await fetch(sprite_path + '/meta.json', {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json());

            let regex = /(\d+)/
            if (entity_id.includes('WallReinforced')){
                regex = /reinf_over(\d+)/
            }
            else if (entity_id.includes('WallSolid')){
                regex = /solid(\d+)/
            }
            else if (entity_id === 'CableMV'){
                regex = /mvcable_(\d+)/
            }
            for (const state of meta.states) {
                if (direction4) {
                    if (!state.directions) continue
                    if (state.directions !== 4) continue
                }
                const numberArray = state.name.match(regex)

                if (!numberArray) continue
                const number = parseInt(numberArray[1])
                states[number] = `${sprite_path}/${state.name.toLowerCase()}.png`
            }
            this.metaStates[entity_id] = states
        }
        return this.metaStates[entity_id]
    }

    private getCustomSpriteStatus(id: string)
    {
        return this.customSprites[id] ?? false
    }
}
