import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {ucwords} from "@/logic/utils.ts";

class AppShellProps {
    children?: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    const location = useLocation();

    useEffect(() => {
        const slug = location.pathname.replace(/\/$/, "");
        document.title = slug
            ? `${ucwords(slug).replace("/", '')} - SS14 Tools`
            : "SS14 Tools";
    }, [location.pathname]);

    return (

        <>
            <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
                {children}
            </div>
        </>
    )
}