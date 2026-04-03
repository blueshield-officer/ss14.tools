import {cn} from "@/lib/utils.ts";
import React from "react";

export default function AppBlock(
    { className, children } :
    { className?: string; children?: React.ReactNode; }
) {
    return (
        <div className={cn("mx-auto justify-items-center w-full px-5 xl:px-20 max-w-7xl", className)}>
            {children}
        </div>
    );
}