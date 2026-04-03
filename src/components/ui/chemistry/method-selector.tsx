
import { Leaf, Zap } from 'lucide-react';
import {useChemistryCalcChosenMethod} from "@/logic/variables.ts";
export function MethodSelector() {
    const options = [
        {
            name: "Optimal",
            icon: <Zap />,
            iconActive: <Zap fill="#FFEA00" color="#FFBF00" />
        },
        {
            name: 'Econom',
            icon: <Leaf />,
            iconActive: <Leaf fill="#00FF00" color="green" />
        },
    ]


    const method = useChemistryCalcChosenMethod(state => state.method)

    return (
        <div className="self-center gap-1">
            <ToggleGroup type="single" value={method} onValueChange={(value) => {
                if (value !== "" && value !== method){
                    useChemistryCalcChosenMethod.getState().setMethod(value)
                }
            }}>
                {options.map((option) => (
                    <ToggleGroupItem value={option.name.toLowerCase()}>
                        <div className="flex items-center">
                            <div className="mr-1">{option.name.toLowerCase() === method ? option.iconActive : option.icon}</div>
                            <p>{option.name}</p>
                        </div>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}
