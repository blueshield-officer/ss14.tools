import {useEffect} from 'react';
import ContentBlock from "@/components/content-block.tsx";
import {ReagentSearch} from "@/components/ui/chemistry/reagent-search.tsx";
import {loadChemistry} from "@/logic/api/dataLoaders.ts";
import {MethodSelector} from "@/components/ui/chemistry/mode-selector.tsx";
import {BeakerSelector} from "@/components/ui/chemistry/beaker-selector.tsx";
import {useChosenRepository} from "@/logic/hooks/useUserRepositories.ts";
import {useChemistryStoreReactions} from "@/logic/stores/useChemistryStore.ts";
import {useLoadedChemistry} from "@/logic/hooks/useLoaded";
import {useChemistryCalculatorSettingsAmount, useChemistryCalculatorSettingsBeaker, useChemistryCalculatorSettingsReactionId} from "@/logic/mechanics/chemistry/useChemistryCalculatorSettings.ts";
import {ReactionDirections} from "@/components/ui/chemistry/reaction-directions.tsx";
import ShortLoading from "@/components/ui/loaders/short-loading.tsx";
import AmountSelector from "@/components/ui/chemistry/amount-selector.tsx";
import calculateReactionOptimal from "@/logic/mechanics/chemistry/core/calculator-reaction-optimal.ts";
import {setChemistryCalculatorDisplayActions} from "@/logic/mechanics/chemistry/useChemistryCalculatorDisplay.ts";

export default function Chemistry()
{
    const repositoryId = useChosenRepository()
    const chemistryLoaded = useLoadedChemistry();

    useEffect(() => {
        if (chemistryLoaded) return
        loadChemistry(repositoryId)
    }, [repositoryId, chemistryLoaded]);


    const reactions = useChemistryStoreReactions()
    const chosenReactionId = useChemistryCalculatorSettingsReactionId()
    const chosenAmount = useChemistryCalculatorSettingsAmount()

    const beaker = useChemistryCalculatorSettingsBeaker()

    //const error = useChemistryCalculatorDisplayError()

    useEffect(() => {
        if (chosenReactionId !== null) {
            setChemistryCalculatorDisplayActions(calculateReactionOptimal(chosenReactionId, chosenAmount, reactions))
            // setChemistryCalculatorDisplaySteps(
            //     calculateBatches(chosenReactionId, chosenAmount, reactions)
            // )
        }
        else {
            setChemistryCalculatorDisplayActions(null)
        }
    }, [chosenAmount, chosenReactionId, reactions, beaker]);

    return (
        <>
            {chemistryLoaded ? (
                <>
                    <ContentBlock className="justify-center">
                        <div className="flex justify-center rounded-xl p-4">
                            <div className="gap-4 flex flex-col">

                                <div className="flex items-center gap-4 flex-wrap">

                                    <ReagentSearch />

                                    <BeakerSelector />

                                    <AmountSelector />

                                </div>

                                <MethodSelector />
                            </div>
                        </div>
                    </ContentBlock>
                    {chosenReactionId !== null && (
                        <ContentBlock>
                            <ReactionDirections />
                        </ContentBlock>
                    )}
                </>

            ) : (
                <ContentBlock className="justify-center">
                    <ShortLoading />
                </ ContentBlock>
            )}
        </>
    )
}