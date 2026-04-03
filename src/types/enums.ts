export const ChemistryMode = {
    Optimal: 'optimal',
    Economy: 'economy',
    Strict: 'strict'
} as const;
export type ChemistryMode = typeof ChemistryMode[keyof typeof ChemistryMode];

export const ChemistryBeaker = {
    Large: 'large',
    Bluespace: 'bluespace'
} as const
export type ChemistryBeaker = typeof ChemistryBeaker[keyof typeof ChemistryBeaker];

export const ChemistryAction = {
    Add: "add",
    React: "react",
    Remove: "remove",
    Tool: "tool",
    Temperature: "temperature",
} as const;

export type ChemistryAction = typeof ChemistryAction[keyof typeof ChemistryAction];