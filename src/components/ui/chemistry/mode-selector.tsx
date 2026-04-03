import {Leaf, Octagon, OctagonMinus, Zap} from "lucide-react";
import ButtonV2 from "@/components/buttonV2";
import {
    setChemistryCalculatorSettingsMode,
    useChemistryCalculatorSettingsMode
} from "@/logic/mechanics/chemistry/useChemistryCalculatorSettings.ts";
import {ChemistryMode} from "@/types/enums.ts";

export function MethodSelector() {
    const options = {
        [ChemistryMode.Optimal]: {
            name: "Optimal",
                icon: <Zap />,
                iconActive: <Zap color="yellow" />
        },
        [ChemistryMode.Economy]: {
            name: 'Economy',
            icon: <Leaf />,
            iconActive: <Leaf color="green" />
        },
        [ChemistryMode.Strict]: {
            name: "Strict",
            icon: <OctagonMinus />,
            iconActive: <Octagon color="red" />
        }

}




    const mode = useChemistryCalculatorSettingsMode()

    return (
        <div className="flex self-center gap-1 justify-center grow">
            {Object.entries(options).map(([key, option]) => (
                <ButtonV2 className="rounded-xl border-2 border-muted p-2 shrink-0 flex select-none"
                          active={option.name.toLowerCase() === mode}
                          onClick={() => {
                              const name = option.name.toLowerCase()
                              if (mode !== name) setChemistryCalculatorSettingsMode(key as ChemistryMode)
                          }}
                >
                    <div className="mr-1">{option.name.toLowerCase() === mode ? option.iconActive : option.icon}</div>
                    <p>{option.name}</p>
                </ButtonV2>
            ))}
        </div>
    )
}
