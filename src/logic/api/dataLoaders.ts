import {setGithubRepositoryListRepositories} from "@/logic/stores/useGithubRepositoriesStore.ts";
import {createApi} from "@/services/api.ts";
import {
    setChemistryStoreReactions,
    setChemistryStoreReagents
} from "@/logic/stores/useChemistryStore.ts";
import {setLoadedChemistry, setLoadedMapResources} from "@/logic/hooks/useLoaded.ts";
import {
    setMapResourcesStoreDecals,
    setMapResourcesStoreEntities,
    setMapResourcesStoreMaps,
    setMapResourcesStoreTiles
} from "@/logic/stores/useMapResourcesStore.ts";
import {setGithubStorePaths} from "@/logic/stores/useGithubStore.ts";

export async function loadGithubRepositoriesData(): Promise<void>
{
    const api = createApi()

    const [repositories, jobs, issues] = await Promise.all([
        api.get("/"),
        // api.get("/jobs"),
        // api.get("/module-issues")
    ]);
    setGithubRepositoryListRepositories(repositories.data);
    // setRepositoryListJobs(jobs.data);
    // setRepositoryListIssues(issues.data);
}

export async function loadGithub() : Promise<void>
{
    const api = createApi()

    const [paths] = await Promise.all([
        api.get("/paths")
    ])

    setGithubStorePaths(paths.data)
}

export async function loadChemistry(repositoryId: number): Promise<void>
{
    const api = createApi(repositoryId)
    const [reagents, reactions] = await Promise.all([
        api.get("/reagents"),
        api.get("/reactions"),
    ])

    setChemistryStoreReagents(reagents.data)
    setChemistryStoreReactions(reactions.data)

    setLoadedChemistry(true)
}

export async function loadMapResources(repositoryId: number): Promise<void>
{
    const api = createApi(repositoryId)
    const [maps, entities, tiles, decals] = await Promise.all([
        api.get("/maps"),
        api.get("/entities"),
        api.get("/tiles"),
        api.get("/decals"),
    ])

    setMapResourcesStoreMaps(maps.data)
    setMapResourcesStoreEntities(entities.data)
    setMapResourcesStoreTiles(tiles.data)
    setMapResourcesStoreDecals(decals.data)

    setLoadedMapResources(true)
}