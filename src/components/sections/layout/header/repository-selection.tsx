import {useGithubRepositoryListRepositories} from "@/logic/stores/useGithubRepositoriesStore.ts";
import {setChosenRepository, useChosenRepository} from "@/logic/hooks/useUserRepositories.ts";
import {useEffect, useRef, useState} from "react";
import type {RepositoryInterface} from "@/config/interfacesAPI.ts";
import ButtonV2 from "@/components/buttonV2.tsx";
import TransparentCard from "@/components/transparent-card.tsx";
import {Search} from "lucide-react";
import {Input} from "@headlessui/react";
import Hr from "@/components/horizontal-line.tsx";
import Repository from "@/components/ui/repository/repository.tsx";

export default function RepositorySelection()
{
    const repositories = useGithubRepositoryListRepositories()
    const chosenRepository = useChosenRepository();

    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const repositoryButton = useRef<HTMLDivElement>(null);
    const dropdownMenu = useRef<HTMLDivElement>(null);
    const repositoryInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        function tryToCloseDropDown(e: MouseEvent)
        {
            if (!repositoryButton.current || repositoryButton.current.contains(e.target as Node)) return;
            if (menuOpen && dropdownMenu.current && !dropdownMenu.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }

        window.addEventListener("click", tryToCloseDropDown)
        return () => window.removeEventListener("click", tryToCloseDropDown)
    }, [menuOpen])

    const filteredRepositories: Record<number, RepositoryInterface> = {}
    Object.keys(repositories).filter(idString => {
        const id = parseInt(idString)
        if (repositories[id].name.toLowerCase().includes(search.toLowerCase()) || repositories[id].name.toLowerCase().includes(search.toLowerCase())) {
            filteredRepositories[id] = repositories[id]
        }
    })
    const repositoryFound = Object.keys(repositories).length !== 0

    return (
        <>
            <div className="h-16 items-center grow-0 w-80 lg:flex justify-start relative">
                <>
                    <button
                        ref={repositoryButton}
                        className="w-60 justify-start z-20 cursor-pointer hover:bg-muted rounded-md"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            if (menuOpen && repositoryInput.current) repositoryInput.current.focus();
                        }}
                    >
                        <Repository repositoryId={chosenRepository} />
                    </button>

                    <div
                        ref={dropdownMenu}
                        className="absolute top-13"
                        style={{
                            opacity: menuOpen ? 1 : 0,
                            pointerEvents: menuOpen ? "auto" : "none",
                            transform: menuOpen ? "translateY(0)" : "translateY(-4px)",
                            transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                        }}
                    >
                        <TransparentCard
                            blur={20}
                            className="flex flex-col justify-center items-center p-2 rounded-md w-full gap-2">
                            <div className="flex border p-2 rounded-md bg-muted">
                                <Search className="opacity-80 mr-2" />
                                <Input
                                    ref={repositoryInput}
                                    id="build-search"
                                    className="w-full rounded-xs outline-0"
                                    type="text"
                                    name="myInput"
                                    placeholder="Repository to search..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                            </div>

                            <Hr />

                            {/* repository list */}
                            <div className="flex flex-col w-full gap-2">
                                {
                                    Object.keys(filteredRepositories).map((key) => (
                                        <ButtonV2
                                            className="w-full"
                                            key={key}
                                            onClick={() => {
                                                setMenuOpen(false);
                                                setChosenRepository(Number(key));
                                            }}
                                        >
                                            <Repository repositoryId={Number(key)} />
                                        </ButtonV2>
                                    ))}
                            </div>
                        </TransparentCard>
                    </div>

                </>
            </div>
        </>
    )
}