import {cn} from "@/lib/utils.ts";
import React from "react";

export default function ToggleButton(
    { className, onClick, children,}:
    { className?: string; onClick?: () => void; children: React.ReactNode; }
) {
    return (
        <button
            onClick={() => onClick?.()}
            className={cn("flex items-center rounded-md px-3.5 py-1.5 bg-muted cursor-pointer", className)}
        >
            {children}
        </button>
    )
}