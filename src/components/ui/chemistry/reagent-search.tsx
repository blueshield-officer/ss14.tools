import { ChevronDownIcon } from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import TransparentCard from '@/components/transparent-card';
import ButtonV2 from "@/components/buttonV2.tsx";
import type {PrototypeReagentsInterface} from "@/config/interfacesAPI.ts";
import {useChosenRepository} from "@/logic/hooks/useUserRepositories.ts";
import {useChemistryStoreReagents} from "@/logic/stores/useChemistryStore.ts";
import {
    setChemistryCalculatorSettingsReactionId,
    useChemistryCalculatorSettingsReactionId
} from "@/logic/mechanics/chemistry/useChemistryCalculatorSettings.ts";
import {createPortal} from "react-dom";

export function ReagentSearch() {
    const repositoryId = useChosenRepository()
    const chosenReactionId = useChemistryCalculatorSettingsReactionId()
    const reagents = useChemistryStoreReagents()

    const classes = "rounded-xl border-2 border-muted p-2"

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dropdownMenu = useRef<HTMLDivElement>(null)


    const filtered_reagents: string[] = []
    if (search === "") {
        filtered_reagents.push(...Object.keys(reagents))
    }
    else {
        filtered_reagents.push(...Object.keys(reagents).filter((reagentId) => {
            const reagent = reagents[reagentId];

            if (!reagent) return false;

            return reagent.name.toLowerCase().includes(search.toLowerCase());
        }))
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = (chosenReactionId === null) ? "" : reagents[chosenReactionId].name
        }
    }, [chosenReactionId, reagents]);

    useEffect(() => {
        const clickFunction = (e: MouseEvent) => {
            if (
                (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) &&
                (dropdownMenu.current && !dropdownMenu.current.contains(e.target as Node))
            ) {
                setIsOpen(false)
                // setIsFocused(false)
            }
        }
        document.addEventListener('click', clickFunction)
        return () => document.removeEventListener('click', clickFunction)
    }, [])

    useEffect(() => {
        if (wrapperRef.current !== null)
        {
            if (chosenReactionId !== null) {
                wrapperRef.current.style.borderColor = reagents[chosenReactionId].color
            }
            else {
                wrapperRef.current.style.borderColor = ""
            }
        }
    }, [reagents, chosenReactionId]);

    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });


    return (
        <div className="relative w-64">
            <div className={`${classes} flex`}
                 ref={wrapperRef}
                 onClick={() => {
                     setIsOpen(true)
                     if (inputRef.current) inputRef.current.focus()
                     if (wrapperRef.current) {
                         const rect = wrapperRef.current.getBoundingClientRect();
                         setDropdownPos({
                             top: rect.bottom + window.scrollY,
                             left: rect.left + window.scrollX,
                             width: rect.width,
                         });
                     }
                     if (inputRef.current) inputRef.current.focus();
                 }}
            >
                <input
                    autoComplete={"off"}
                    autoCorrect={"off"}
                    ref={inputRef}
                    id="reagent-search"
                    type="text"
                    className="outline-0 cursor-default grow"
                    placeholder="Reagent"
                    onKeyDown={(e) => {
                        if (chosenReactionId !== null && inputRef.current){
                            if (e.key === "Backspace") {
                                inputRef.current.value = "";
                                setSearch("")
                                setChemistryCalculatorSettingsReactionId(null)
                            }
                            else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                                inputRef.current.value = e.key;
                                setSearch(e.key)
                                setChemistryCalculatorSettingsReactionId(null)
                            }
                        }
                    }}
                    onChange={(e) => {
                        const search = e.target.value
                        setSearch(search)
                        if (reagents[search] === undefined) {
                            setChemistryCalculatorSettingsReactionId(null)
                        }
                    }}
                />
                <ChevronDownIcon className="w-5 h-5 ml-2"/>
            </div>

            {isOpen && createPortal(
                <div
                    ref={dropdownMenu}
                    style={{
                        position: "absolute",
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                        zIndex: 9999,
                    }}
                >
                    <TransparentCard className={`${classes} gap-1 max-h-52 overflow-y-auto flex flex-col`}>
                        {ShowData(reagents, filtered_reagents)}
                    </TransparentCard>
                </div>,
                document.body
            )}
        </div>
    )

    function ShowData(reagents: PrototypeReagentsInterface, filtered_reagents: string[] = [])
    {
        // if (reagents === undefined) {
        //     return <div className="text-stone-400">Loading...</div>
        // }
        const amount = filtered_reagents.length

        if (amount === 0) {
            return <div className="text-stone-400">Nothing was found</div>
        }


        return filtered_reagents.map((reagentId) => (
            <ButtonV2
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-xl"
                key={reagents[reagentId].reagentId}
                onClick={() => {
                    if (inputRef.current) inputRef.current.value = reagents[reagentId].name
                    setChemistryCalculatorSettingsReactionId(reagentId)
                    setIsOpen(false)
                }}
            >
                {amount < 30 && (
                    <div
                        style={{backgroundColor: reagents[reagentId].color}}
                        className="w-2 h-4 mr-2 rounded"
                    />
                )}
                <p className="text-sm">{reagents[reagentId].name}</p>
            </ButtonV2>
        ))
    }
}