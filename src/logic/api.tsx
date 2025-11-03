import { QueryClient } from '@tanstack/react-query';
import {getUriLastSegment} from '@/logic/utils';
import {useRepositoryList, useChemistry, useMaps} from "@/logic/variables.ts";
import {apiPath} from "@/logic/global-variables.ts";
import {indexByKey} from "@/logic/utils.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

export async function fetchApiAutomatic(slug: string, method: string = 'GET', body: string | object = '') {
    const repository_id = parseInt(slug.split('/')[0]);

    async function getResult() {
        return await fetchApi(slug, method, body);
    }

    if (slug === 'repositories' && Object.keys(useRepositoryList.getState().repositories).length === 0)
    {
        const result = await getResult();
        useRepositoryList.getState().setRepositories(indexByKey(result, "id"));
    }
    else if (slug.endsWith('/maps') && useMaps.getState().maps.length === 0)
    {
        const result = await getResult()
        useMaps.getState().addMaps(repository_id, result);
    }
    else if (slug.includes('/maps/'))
    {
        const result = await getResult()
        useMaps.getState().addMapsData(repository_id, getUriLastSegment(slug), JSON.parse(result));
    }
    else if (slug.endsWith('/chemistry'))
    {
        const result = await getResult()
        useChemistry.getState().addReagents(repository_id, result.reagents);
        useChemistry.getState().addReactions(repository_id, result.reactions);
    }
    else if (slug.endsWith('/sprites/tiles'))
    {
    }
    else if (slug.endsWith('/sprites/entities'))
    {
    }

}

export async function fetchApi(slug: string, method: string, body: string | object) {
    const url = apiPath(slug);
    const fetchParams: object = {
        method: method,
    }
    if (method === 'POST') {
        fetchParams.body = body === '' ? body : JSON.stringify(body);
        fetchParams.headers = {
            'Content-Type': 'application/json',
        };
    }
    return await queryClient.fetchQuery({
        queryKey: [url],
        queryFn: () =>
            fetch(url, fetchParams)
                .then((res) => res.json()),
    });
}
