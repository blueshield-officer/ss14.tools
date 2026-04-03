import {ChemistryAction} from "@/types/enums.ts";
import Reagent from "@/components/sections/pages/chemistry/reagent.tsx";
import Tool from "@/components/sections/pages/chemistry/tool.tsx";
import type {ReactionAction} from "@/logic/mechanics/chemistry/core/calclator-reaction.ts";
import Temperature from "@/components/sections/pages/chemistry/temperature.tsx";

export default function Action (
    {action}: {action: ReactionAction}
)
{
    if (action.type === ChemistryAction.Add) return <Reagent reagentId={action.reagentId} amount={action.amount} />
    if (action.type === ChemistryAction.Remove) return <Reagent reagentId={action.reagentId} amount={action.amount} />
    if (action.type === ChemistryAction.Tool) return <Tool tool={action.tool} />
    if (action.type === ChemistryAction.Temperature) return <Temperature min={action.minTemp} max={action.maxTemp} />
}