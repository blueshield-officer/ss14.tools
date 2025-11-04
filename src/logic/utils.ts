export function findBuildById(builds: any[], id: number)
{
   if (builds){
       if (id !== 0 && builds.length !== 0) {
           return builds.find(build => build.id == id)
       }
   }
    return {
        id: 'unknown',
        name: 'Builds Is Not Chosen',
        github: 'Please choose build',
    };
}

export function ucwords(str: string)
{
    return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

export function array_unique(array: any[])
{
    return [...new Set(array)];
}

export function array_item_occurrence(array: string[] | boolean[] | number[]): Record<string | number, number>
{
    const itemList: Record<string | number, number> = {}

    for (let item of array){
        item = typeof item === 'boolean' ? (!item ? 0 : 1) : item
        if (!itemList[item]){
            itemList[item] = 0
        }
        itemList[item]++;
    }

    return itemList
}

export function array_mutiply(array: any[])
{
    return array.reduce((a, b) => a * b, 1);
}

export const gcd = (a, b) => a ? gcd(b % a, a) : b;

export const lcm = (a, b) => a * b / gcd(a, b);

export function parseJsonIfExist(json: any)
{
    if (json === undefined || json === null || json === '') {
        return [];
    }
    else {
        return JSON.parse(decodeURIComponent(json));
    }
}


export function preferredColor(color: string)
{
    return window.matchMedia(`(prefers-color-scheme: ${color})`).matches;
}

export function stringToBoolean(str: string)
{
    if (str === 'true') {
        return true;
    }
    else if (str === 'false') {
        return false;
    }
    else {
        return str;
    }
}

export function object_last(object: object[])
{
    const objectEntries = Object.entries(object)
    return objectEntries[objectEntries.length - 1];
}

export function indexByKey(array: any, key: string): any {
    const newArray = {}
    array.forEach((item: any) => {
        const keyValue = item[key]
        newArray[keyValue] = item;
    })
    return newArray;
}

export function getUriLastSegment(uri: string) {
    return uri.split('/').pop() || "";
}