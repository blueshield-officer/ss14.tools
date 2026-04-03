import {cloneElement, type ReactNode} from "react";
export default function StateBadge({icon, text, state}: {icon: ReactNode, text: string | undefined, state: boolean | number})
{
    if (typeof state === "boolean") state = state ? 1 : -1;
    const color = state === 1 ? "green" : (state === 0 ? "yellow" : "red");

    const bgColors = {
        green: "bg-green-900",
        yellow: "bg-yellow-900",
        red: "bg-red-900"
    }
    const textColors = {
        green: "text-green-200",
        yellow: "text-yellow-200",
        red: "text-red-200"
    }
    const iconColor =
        state === 1 ? "oklch(92.5% 0.084 155.995)" :
        state === 0 ? "oklch(94.5% 0.129 101.54)" :
        "oklch(88.5% 0.062 18.334)"

    const iconStyled = cloneElement(icon, {
        height: "17px",
        color: iconColor,
        className: "mr-0.5"
    })

    return (
        <div className={"flex rounded-md p-1 " + bgColors[color]  + " " + textColors[color]}>
            {iconStyled}
            {typeof text === "string" && <p className={"text-xs mr-1"}>{text}</p>}
        </div>
    )
}