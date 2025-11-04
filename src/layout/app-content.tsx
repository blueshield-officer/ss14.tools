import {useEffect} from "react";

type AppContentProps = React.ComponentProps<'main'>
export default function AppContent({children }: AppContentProps) {
    {
        return (
            <main className={"mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 mt-20 mb-2"}>
                {children}
            </main>
        );
    }
}