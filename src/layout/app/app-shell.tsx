import {useLocation} from "react-router-dom";
import React, {useEffect, useLayoutEffect} from "react";
import {ucwords} from "@/logic/utils.ts";
import {getTheme} from "@/logic/hooks/useTheme.ts";
class AppShellProps {
    children?: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    const location = useLocation();

    useLayoutEffect(() => {
        const theme = getTheme();
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [])

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