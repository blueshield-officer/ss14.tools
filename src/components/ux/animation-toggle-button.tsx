import {SquarePlay, SquareX} from "lucide-react";
import ToggleButton from "@/components/essential/toggle-button.tsx";
import {setBackgroundAnimation, useBackgroundAnimation} from "@/logic/hooks/useBackround.ts";

export default function AnimationToggleButton ()
{
    const animation = useBackgroundAnimation()

    return (
        <ToggleButton
            onClick={() => setBackgroundAnimation(!animation)}
            className="flex items-center rounded-md px-3.5 py-1.5 bg-muted cursor-pointer"
        >
            {animation ?
                <SquarePlay className="-ml-1 h-4 w-4" />
                :
                <SquareX  className="-ml-1 h-4 w-4" />
            }
        </ToggleButton>
    )
}