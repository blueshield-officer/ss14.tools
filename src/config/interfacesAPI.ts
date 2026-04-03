// ///////////////////
//
//      Repositories
//
//////////////////////

export interface RepositoryInterface {
    id: number,
    name: string,
    organization: string,
    localization: string | null,
    owner_id: string,
    auto_sync: number,
    status: number,
    updated_at: string | null,
}

export interface RepositoryModuleIssueInterface {
    module_id: string,
    src: string | null,
    date: string,
}


//////////////////////
//
//      Chemistry
//
//////////////////////

export type PrototypeReagentsInterface = Record<string, PrototypeReagentInterface>;
export interface PrototypeReagentInterface {
    pathId: number,
    reagentId: string,
    name: string,
    description: string,
    threshold: number | null,
    group: string,
    color: string,
    effects: PrototypeReagentEffectInterface[] | [],
}
export type RecipeReactionsInterface = Record<string, RecipeReactionInterface>;
export interface RecipeReactionInterface {
    reactionId: string,
    pathId: number,
    source: 0 | 1,
    tool: string | null,
    minTemp: number | null,
    maxTemp: number | null,
    product: PrototypeRecipesReactionProduct,
    reactants: PrototypeRecipesReactionReactants[],
}
export interface PrototypeReagentEffectInterface {
    reagentId: string,
    damageType: string,
    damageValue: number,
}

export interface PrototypeRecipesReactionProduct {
    reagentId: string,
    ratio: number,
}

export interface PrototypeRecipesReactionReactants {
    reagentId: string,
    ratio: number,
    catalyst: 1 | 0,
}


// ///////////////////
//
//      Maps
//
//////////////////////

export type MapsInterface = Record<string, MapInterface>;
export interface MapInterface {
    pathId: number,
    mapId: string,
    category: string,
}

// ///////////////////
//
//      Maping Resources
//
//////////////////////
export type MappingResourcesTilesInterface = Record<string, MappingResourcesTileInterface>
export interface MappingResourcesTileInterface {
    tileId: string,
    pathId: number,
    name: string,
    isSubfloor: 1 | 0,
    sprite_path: string,
}

export type MappingResourcesDecalsInterface = Record<string, MappingResourcesDecalInterface>
export interface MappingResourcesDecalInterface {
    decalId: string,
    pathId: number,
    spritePath: string,
    spriteState: string
}
export type MappingResourcesEntitiesInterface = Record<string, MappingResourcesEntityInterface>
export interface MappingResourcesEntityInterface {
    entityId: string,
    pathId: number,
    categoryId: number,
    name: string,
    description: string,
    spritePath: string | null
    category: number
    parents: string[]
}