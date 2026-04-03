import React from "react";
import {srcPath} from "@/logic/global-variables.ts";
import clown from "@img/misc/clown.png";

export default function RepositoryTemplate (
    {id, children}: { id: number | null, children: React.ReactNode }
)
{
    return (
        <div className="flex grow items-center text-left select-none h-9 px-2 ">
            <>
                <img
                    src={id ? srcPath(`/repository_data/${id}/logo.png`) : clown}
                    className="w-7 h-7 rounded-md mr-2"
                    alt={id !== null ? String(id) : "unknown"}
                />
                {children}
            </>
        </div>
    )
}