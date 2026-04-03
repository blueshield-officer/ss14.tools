import type {RecipeReactionsInterface} from "@/config/interfacesAPI.ts";
import {ChemistryAction} from "@/types/enums.ts";

export type ReactionAction =
    | { type: typeof ChemistryAction.Add;           reagentId: string; amount: number }
    | { type: typeof ChemistryAction.Remove;        reagentId: string; amount: number }
    | { type: typeof ChemistryAction.Tool;          tool: string }
    | { type: typeof ChemistryAction.Temperature;   maxTemp: number | null; minTemp: number | null }


export function findReaction (
    reactionId: string,
    reactions: RecipeReactionsInterface,
    strict: boolean = false
)
{
    let reaction = reactions[reactionId];
    if (strict && !reaction){
        return null
    }

    if (!reaction) {
        for (const reactionIdLoop of Object.keys(reactions)){
            const product = reactions[reactionIdLoop].product
            if (product){
                if (product.reagentId === reactionId){
                    reaction = reactions[reactionIdLoop];
                    //setChemistryCalculatorDisplayMessage("You are viewing chemical element, it cannot be created, only extracted through breakdown of other compounds.")
                    // break;
                }
            }
        }
    }

    return reaction;
}

// export function calculateBatches(
//     reactionId: string,
//     amount: number,
//     reactions: RecipeReactionsInterface
// ): ChemistryAction[]
// {
//     const reaction = findReaction(reactionId, reactions)
//
//
//     const batches = Math.ceil(amount / reaction.product.ratio);
//     const produced = batches * reaction.product.ratio;
//     const excess = produced - amount;
//
//     const actions: ChemistryAction[] = [];
//
//     reaction.reactants.forEach(reactant => {
//         if (reactions[reactant.reagentId]) {
//             // todo fix it
//             steps.push(...calculateBatches(reactant.reagentId, reactant.ratio * batches, reactions));
//         }
//     });
//
//     const actions: ReactionAction[] = [];
//
//     reaction.reactants.forEach(reactant => {
//         actions.push({ type: ChemistryAction.Add, reagentId: reactant.reagentId, amount: reactant.ratio * batches });
//     });
//
//     if (reaction.tool !== null) {
//         actions.push({ type: ChemistryAction.Tool, tool: reaction.tool });
//     }
//
//     actions.push({ type: ChemistryAction.React, produces: produced });
//
//     if (excess > 0) {
//         actions.push({ type: ChemistryAction.Remove, reagentId: reactant.reagentId, amount: excess });
//     }
//
//     steps.push({ reagentId: reactionId, action: actions, minTemp: reaction.minTemp, maxTemp: reaction.maxTemp });
//
//     return actions
// }