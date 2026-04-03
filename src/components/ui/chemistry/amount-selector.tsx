import {useEffect, useRef} from "react";
import {
    setChemistryCalculatorSettingsAmount, useChemistryCalculatorSettingsAmount,
    useChemistryCalculatorSettingsBeaker
} from "@/logic/mechanics/chemistry/useChemistryCalculatorSettings.ts";
import {ChemistryBeaker} from "@/types/enums.ts";

export default function AmountSelector() {

    const inputRef = useRef<HTMLInputElement>(null);
    const chosenAmount = useChemistryCalculatorSettingsAmount()

    const beaker = useChemistryCalculatorSettingsBeaker()
    const maxCapacity = beaker === ChemistryBeaker.Large ? 100 : 1000;

    useEffect(() => {
        if (chosenAmount > maxCapacity) setChemistryCalculatorSettingsAmount(maxCapacity)
    }, [maxCapacity, chosenAmount]);

    useEffect(() => {
        limitBeakerAmount()
    }, [beaker]);


    function limitBeakerAmount () : void
    {
        if (inputRef.current) {
            if (parseInt(inputRef.current.value) > maxCapacity) {
                inputRef.current.value = String(maxCapacity)
            }
            else if (parseInt(inputRef.current.value) < 1) {
                inputRef.current.value = "1"
            }
        }
    }


    return (
        <div className="flex">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="number"
                    min="1"
                    max={maxCapacity}
                    className="w-36 rounded-l-xl rounded-bl-xl border-2 border-muted p-2 pr-14 outline-0"
                    placeholder="Amount"
                    value={chosenAmount}
                    onChange={(amount) => {
                        limitBeakerAmount()
                        setChemistryCalculatorSettingsAmount(parseInt(amount.target.value))
                    }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    / {maxCapacity.toLocaleString()}
                </span>
            </div>
            <p className="rounded-rl-xl rounded-r-xl border-t-2 border-r-2 border-b-2 p-2">u</p>
        </div>
    )
}