import Action from "@/components/sections/pages/chemistry/action.tsx";
import {useChemistryCalculatorDisplayActions} from "@/logic/mechanics/chemistry/useChemistryCalculatorDisplay.ts";
export function ReactionDirections()
{
    // const error = useChemistryCalculatorDisplayError()
    // const message = useChemistryCalculatorDisplayMessage()
    const action = useChemistryCalculatorDisplayActions()

    return (
        <div className="flex flex-col gap-2">
            {action !== null ?
                (action.map((action) => <Action action={action} /> ))
                :
                <p className="text-center">What are we cooking today eh?</p>
            }
        </div>
    );
}

