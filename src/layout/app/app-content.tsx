import React from "react";
import AppBlock from "@/layout/app/app-block.tsx";

type AppContentProps = React.ComponentProps<'main'>
export default function AppContent({children }: AppContentProps) {
    {
        return (
            <AppBlock className="grow">
                <main className={"flex h-full w-full max-w-7xl flex-1 flex-col gap-4 mt-20 mb-2"}>
                    {children}
                </main>
            </AppBlock>
        );
    }
}