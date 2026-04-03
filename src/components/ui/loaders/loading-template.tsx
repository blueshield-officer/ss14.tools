import TransparentCard from "@/components/transparent-card.tsx";
import React from "react";

export default function LoadingTemplate(
    { children }: { children: React.ReactNode }
)
{
    return (
        <TransparentCard className={"w-110 h-110 self-center rounded-xl mx-auto"}>
            { children }
        </TransparentCard>
    )
}