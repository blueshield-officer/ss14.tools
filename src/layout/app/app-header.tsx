import TransparentCard from "@/components/transparent-card.tsx";
import AppLogo from "@/components/app-logo.tsx";
import { Link } from "react-router";
import {PagesConfig} from "@/config/pages.tsx";
import ButtonV2 from "@/components/buttonV2.tsx";
import {useLocation} from "react-router-dom";
import RepositorySelection from "@/components/sections/layout/header/repository-selection.tsx";
import AppBlock from "@/layout/app/app-block.tsx";

export default function AppHeader ()
{

    const location = useLocation();

    return (
        <AppBlock className="fixed top-2 left-1/2 -translate-x-1/2 z-10">
            <TransparentCard className={"w-full rounded-xl select-none flex-1 flex items-center px-2"}>
                {/* logo*/}
                <div className="mx-auto flex h-16 items-center md:max-w-7xl shrink-0">
                    <Link  to={{
                        pathname: "/",
                    }}
                           className={"flex items-center"}>
                        <AppLogo />
                    </Link>
                </div>


                {/* navigation menu */}
                <div className="h-16 ml-6 items-center grow space-x-2 flex w-full flex-nowrap">
                    {PagesConfig.map(page => {
                        if (page.navigator) {
                            return (
                                <div className={"h-full items-center flex relative"} key={page.name}>
                                    <ButtonV2>
                                        <Link
                                            className={"h-9 cursor-pointer px-3 flex items-center"}
                                            to={{
                                                pathname: page.slug
                                            }}
                                        >
                                            {page.icon && <img src={page.icon} className="mr-2 h-4 w-4"  style={{imageRendering: "pixelated"}} />}
                                            <span className={"font-semibold"}>{page.name}</span>
                                        </Link>
                                    </ButtonV2>
                                    {location.pathname === page.slug && (
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
                {/*<div className={"h-16 items-center grow-0 shrink-0 space-x-2 flex"}>*/}
                {/*    <TooltipProvider key={Math.random()} delayDuration={0}>*/}
                {/*        <Tooltip data-state="open">*/}
                {/*            <TooltipTrigger>*/}
                {/*                <ButtonV2>*/}
                {/*                    <Link to={"/database"}> <Database /></Link>*/}
                {/*                </ButtonV2>*/}
                {/*            </TooltipTrigger>*/}
                {/*            <TooltipContent className={"transition-all"}>*/}
                {/*                <p>Database</p>*/}
                {/*            </TooltipContent>*/}
                {/*        </Tooltip>*/}
                {/*    </TooltipProvider>*/}
                {/*    <TooltipProvider key={Math.random()} delayDuration={0}>*/}
                {/*        <Tooltip data-state="open">*/}
                {/*            <TooltipTrigger>*/}
                {/*                <ButtonV2>*/}
                {/*                    <Link*/}
                {/*                        to={"/database"}*/}
                {/*                    >*/}
                {/*                        <BookOpenText />*/}
                {/*                    </Link>*/}
                {/*                </ButtonV2>*/}
                {/*            </TooltipTrigger>*/}
                {/*            <TooltipContent className={"transition-all"}>*/}
                {/*                <p>Api Documentation</p>*/}
                {/*            </TooltipContent>*/}
                {/*        </Tooltip>*/}
                {/*    </TooltipProvider>*/}
                {/*</div>*/}

                {/* build menu */}
                <RepositorySelection />
            </TransparentCard>
        </AppBlock>
    );
}

// {
//     Object.keys(filteredRepositories).length === 0 ? (
//         <p className={"accent-secondary p-2"}>
//             Nothing was found.
//         </p>
//     ) : (
//         Object.keys(filteredRepositories).map((repositoryId) => {
//             const repository: RepositoryInterface = repositories[Number(repositoryId)]
//             return (
//                 <DropdownMenuItem key={repositoryId} className={" focus:outline-none data-[highlighted]:outline-none"} tabIndex={-1} onClick={ () => SetChosenRepository(repository.id) }>
//                     <Button className={"w-full p-3"}  variant="ghost" onClick={() => {
//                         if (chosenRepository !== repository.id) {
//                             SetChosenRepository(repository.id)
//                         }
//                     }}>
//                         <Repository repository={repository} type={"clickable"}/>
//                     </Button>
//                 </DropdownMenuItem>
//             )
//         })
//     )
// }