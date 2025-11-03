import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Search } from 'lucide-react';
import { useState } from "react";
import { BuildButton } from '@/components/build-button';
import { Input } from '@headlessui/react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import Repository from "@/components/repository.tsx";
import type {RepositoryInterface} from "@/config/interfaces.ts";
import {SetChosenRepository} from "@/hooks/use-user-repositories.tsx";

export function RepositoryMany({ builds }) {
    const [search, setSearch] = useState('');


    const filtered_builds = builds.filter(build => {
        if (build.name.toLowerCase().includes(search.toLowerCase()) || build.name.toLowerCase().includes(search.toLowerCase())) {
            return build
        }
    })




    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="w-50">
                    <Repository repository={repositories[chosenRepository] || {
                        id: 0,
                        name: "Choose Repository",
                    }} />
                </button>
                {/*<BuildButton build={builds.forEach((build) => build.id === chosenBuildId => {})}>*/}

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
            <div className="flex justify-center items-center p-2">
                <Search className="!size-5 opacity-80 mr-2" />
                <Input
                    id="build-search"
                    className="w-full rounded-xs outline-0"
                    type="text"
                    name="myInput"
                    placeholder="Type in build to search..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuContent className="w-50" align="start">
                {/*<RepositoryMany builds={builds} />*/}

                <DropdownMenuGroup>
                    {
                        Object.keys(repositories).map((repositoryId) => {
                            const repository: RepositoryInterface = repositories[Number(repositoryId)]
                            return (
                                <DropdownMenuItem onClick={ () => SetChosenRepository(repository.id) }>
                                    <Repository repository={repository} />
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
