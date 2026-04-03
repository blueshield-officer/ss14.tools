import type {Color} from "@/logic/invert.ts";

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

export const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;

export const lcm = (a: number, b: number): number => a * b / gcd(a, b);

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

export function arrayEmpty(array: any[]) : boolean
{
    if (typeof array === "object")
    {
        return Object.keys(array).length === 0;
    }
    return array.length === 0;
}


export function toBitmask(array: number[]): number
{
    let n = 0
    for (const number of array){
        n |= 1 << number
    }
    return n
}

export function daysFromDate(date: Date, styled: boolean = false)
{
    const today = new Date();
    const days = Math.round((today.getTime() - date.getTime()) / (1000 * 3600 * 24));
    if (!styled) return days;
    return  days === 0 ? "Today" : days === 1 ? "Yesterday" : days + " days ago";
}

export function empty(object: object)
{
    return Object.keys(object).length === 0;
}

export function colorNameToHex(color: string) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (ctx !== null){
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
    }
    throw new Error("Unknown color");
}

export function isHexColor(str: string) {
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str);
}