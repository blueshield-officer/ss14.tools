import beakerlarge from "@img/gameItems/misc/beakerlarge.png";
import beakerbluespace from "@img/gameItems/misc/beakerbluespace.png";
import ButtonV2 from "@/components/buttonV2.tsx";
import {
    setChemistryCalculatorSettingsBeaker,
    useChemistryCalculatorSettingsBeaker
} from "@/logic/mechanics/chemistry/useChemistryCalculatorSettings.ts";
import type {ChemistryBeaker} from "@/types/enums.ts";

export function BeakerSelector() {
    const options = [
        {
            name: "Large Beaker",
            value: "large",
        },
        {
            name: "Bluespace Beaker",
            value: "bluespace",
        }
    ]

    const chosenBeaker = useChemistryCalculatorSettingsBeaker()

    return (
        <div className={"flex gap-1"} >
            {options.map((option) => (
                    <ButtonV2 className={"rounded-xl border-2 border-muted p-2 shrink-0"} active={chosenBeaker === option.value} onClick={() => {
                        const beaker = option.value as ChemistryBeaker
                        if ( beaker !== chosenBeaker){
                            setChemistryCalculatorSettingsBeaker(beaker)
                        }
                    }}>
                        <img
                            style={ {imageRendering: "pixelated"}}
                            src={ option.value === "large" ? beakerlarge : beakerbluespace }
                            alt={option.value}
                            className="h-6" />
                    </ButtonV2>
            ))}
        </div>
    )
}
