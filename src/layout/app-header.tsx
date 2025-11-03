import TransparentCard from "@/components/transparent-card.tsx";
import AppLogo from "@/components/app-logo.tsx";
import { Link } from "react-router";
import {PagesConfig} from "@/config/pages.tsx";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import Repository from "@/components/repository.tsx";
import {useEffect, useState} from "react";
import {fetchApiAutomatic} from "@/logic/api.tsx";
import {useRepositoryList} from "@/logic/variables.ts";
import type {RepositoryInterface} from "@/config/interfaces.ts";
import {GetChosenRepository, SetChosenRepository} from "@/hooks/use-user-repositories.tsx";
import {Database, Search} from "lucide-react";
import { Input} from "@headlessui/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/libraries/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/libraries/dropdown-menu';
import { Button } from "@/components/button";
import {getUriLastSegment} from "@/logic/utils.ts";

export default function AppHeader ()
{

    useEffect(() => {
        fetchApiAutomatic('repositories')
    }, []);

    const repositories = useRepositoryList(state => state.repositories);
    const chosenRepository = GetChosenRepository();

    const [search, setSearch] = useState('');

    const filteredRepositories: Record<number, RepositoryInterface> = {}
    Object.keys(repositories).filter(idString => {
        const id = parseInt(idString)
        if (repositories[id].name.toLowerCase().includes(search.toLowerCase()) || repositories[id].name.toLowerCase().includes(search.toLowerCase())) {
            filteredRepositories[id] = repositories[id]
        }
    })

    console.log(getUriLastSegment(location.toString()))

    return (
        <TransparentCard className={"mx-auto w-full max-w-7xl rounded-xl fixed top-2 left-1/2 -translate-x-1/2 z-10 select-none flex-1 flex items-center "}>
            {/* logo*/}
            <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl shrink-0">
                <Link  to={{
                    pathname: "/",
                }}
                       className={"flex items-center"}>
                    <AppLogo />
                </Link>
            </div>


            {/* navigation manu */}
            <div className="h-16 ml-6 items-center grow space-x-2 lg:flex w-full">
                {PagesConfig.map(page => {
                    if (page.navigator) {
                        return (
                            <div className={"h-full items-center flex relative"}>
                                <Link
                                    className={"" +
                                        "h-9 cursor-pointer px-3 flex items-center"}
                                    to={{
                                        pathname: page.slug
                                    }}
                                >
                                    {page.icon && <img src={page.icon} className="mr-2 h-4 w-4"  style={{imageRendering: "pixelated"}} />}
                                    {page.name}
                                </Link>
                                {getUriLastSegment(location.toString()) === page.slug.replace("/", '') && (
                                    <div
                                        className={"absolute h-0.5 w-full bottom-0"}
                                        style={{
                                            backgroundColor: "white",
                                        }}
                                    />
                                )}
                            </div>
                        )
                    }
                })}
            </div>

            { /* additional buttons */ }
            <div className={"h-16 items-center grow-0 shrink-0  flex"}>
                <TooltipProvider key={Math.random()} delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link
                                to={"/database"}
                                className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            >
                                <Database />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Database</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* build menu */}
            <div className="h-16 items-center grow-0 w-80 lg:flex justify-start">
                <DropdownMenu
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            setSearch("")
                        }
                    }}
                >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-60 justify-start" onClick={() => console.log("t")}>
                            <Repository repository={repositories[chosenRepository] || {
                                id: 0,
                                name: "Choose Repository",
                            }}
                            />
                        </Button>

                        {/*</BuildButton>*/}
                        {/*<Button variant="ghost" className="p-2">*/}
                        {/*<BuildButton build={build} />*/}
                        {/*<Avatar className="size-8 overflow-hidden rounded-full">*/}
                        {/*    /!*<AvatarImage src={auth.user.avatar} alt={auth.user.name} />*!/*/}
                        {/*    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">*/}
                        {/*        /!*{getInitials(auth.user.name)}*!/*/}
                        {/*    </AvatarFallback>*/}
                        {/*</Avatar>*/}
                        {/*</Button>*/}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-60" align="start"
                        unselectable={"on"}
                    >
                        {/*<RepositoryMany builds={builds} />*/}
                        <div className="flex justify-center items-center p-2">
                            <Search className="!size-5 opacity-80 mr-2" />
                            <Input
                                id="build-search"
                                className="w-full rounded-xs outline-0"
                                type="text"
                                name="myInput"
                                placeholder="Type in build to search..."
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup  data-state="open">
                            {
                                Object.keys(repositories).length === 0 ? (
                                    <p className={"accent-secondary"}>
                                        Nothing was found.
                                    </p>
                                ) : (
                                    Object.keys(filteredRepositories).map((repositoryId) => {
                                        const repository: RepositoryInterface = repositories[Number(repositoryId)]
                                        return (
                                            <DropdownMenuItem tabIndex={-1} onClick={ () => SetChosenRepository(repository.id) }>
                                                <Button className={"w-full p-2"}  variant="ghost" onClick={() => {
                                                    if (chosenRepository !== repository.id) {
                                                        SetChosenRepository(repository.id)
                                                    }
                                                }}>
                                                    <Repository repository={repository} type={"clickable"}/>
                                                </Button>
                                            </DropdownMenuItem>
                                        )
                                    })
                                )
                            }
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </TransparentCard>
    );
}