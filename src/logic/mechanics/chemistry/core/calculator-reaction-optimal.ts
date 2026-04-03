import type {RecipeReactionInterface, RecipeReactionsInterface} from "@/config/interfacesAPI.ts";
import {findReaction, type ReactionAction} from "@/logic/mechanics/chemistry/core/calclator-reaction.ts";
import {lcm} from "@/logic/utils.ts";
import {ChemistryAction} from "@/types/enums.ts";


const SNAP_SIZES = [100, 50, 30, 25, 20, 15, 10, 5, 1];

function getOptimalAmount(amount: number, minClean: number): number {
    for (const snap of SNAP_SIZES) {
        const step = lcm(minClean, snap);
        const rounded = Math.ceil(amount / step) * step;
        if (rounded <= amount * 1.3 && rounded <= 100) {
            return rounded;
        }
    }
    return Math.min(Math.ceil(amount / minClean) * minClean, 100);
}


function getMinCleanAmount(reaction: RecipeReactionInterface, reactions: RecipeReactionsInterface): number {
    let result = reaction.product.ratio;

    for (const reactant of reaction.reactants) {
        if (reactions[reactant.reagentId]) {

            const reactantReaction = findReaction(reactant.reagentId, reactions, true);
            if (!reactantReaction) continue;

            const subMin = getMinCleanAmount(reactantReaction, reactions);
            result = lcm(result, subMin);
        }
    }

    return result;
}


export default function calculateReactionOptimal(
    reactionId: string,
    amount: number,
    reactions: RecipeReactionsInterface
): ReactionAction[] {
    const reaction = findReaction(reactionId, reactions);
    if (!reaction) return [];

    const minCleanAmount = getMinCleanAmount(reaction, reactions);
    const optimizedAmount = getOptimalAmount(amount, minCleanAmount);

    return postProcessBatches(
        calculateSimpleBatch(reactionId, optimizedAmount, reactions)
    );
}

function calculateSimpleBatch(
    reactionId: string,
    amount: number,
    reactions: RecipeReactionsInterface
): ReactionAction[] {
    const reaction = findReaction(reactionId, reactions, true);
    if (!reaction) return [];

    const batches = Math.ceil(amount / reaction.product.ratio);
    //const produced = batches * reaction.product.ratio;
    //const excess = produced - amount;

    const actions: ReactionAction[] = [];

    reaction.reactants.forEach(reactant => {
        if (reactions[reactant.reagentId]) {
            actions.push(...calculateSimpleBatch(reactant.reagentId, reactant.ratio * batches, reactions));
        }
        else {
            actions.push({ type: ChemistryAction.Add, reagentId: reactant.reagentId, amount: reactant.ratio * batches });
        }
    });

    if (reaction.tool !== null) {
        actions.push({ type: ChemistryAction.Tool, tool: reaction.tool });
    }

    const hasTemp = reaction.minTemp !== null || reaction.maxTemp !== null;
    if (hasTemp) actions.push({ type: ChemistryAction.Temperature, minTemp: reaction.minTemp, maxTemp: reaction.maxTemp });

    // if (excess > 0) {
    //     actions.push({ type: ChemistryAction.Remove, reagentId: reactant.reagentId, amount: excess });
    // }

    //
    // if (!hasTemp && steps.length > 0) {
    //     const lastStep = steps[steps.length - 1];
    //     lastStep.action.push(...actions);
    // } else {
    //     steps.push({
    //         reagentId: reactionId,
    //         action: actions,
    //         minTemp: reaction.minTemp,
    //         maxTemp: reaction.maxTemp
    //     });
    // }

    return actions;
}

function postProcessBatches(actions: ReactionAction[]): ReactionAction[] {
    const result: ReactionAction[] = [...actions];

    for (let i = 0; i < result.length; i++) {
        const action = result[i];
        if (action.type !== ChemistryAction.Add) continue;

        // find a later duplicate
        const laterIndex = result.findIndex(
            (a, j) => j > i && a.type === ChemistryAction.Add && a.reagentId === action.reagentId
        );

        if (laterIndex !== -1) {
            const later = result[laterIndex];
            if (later.type === ChemistryAction.Add) {
                // transfer amount from first to last
                later.amount += action.amount;
                // remove the first one
                result.splice(i, 1);
                i--; // step back since array shifted
            }
        }
    }

    return result;
}