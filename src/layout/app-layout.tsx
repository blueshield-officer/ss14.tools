import AppHeader from "@/layout/app-header.tsx";
import AppFooter from "@/layout/app-footer.tsx";
import type {ReactNode} from "react";
import AppContent from "./app-content";
import AppShell from "@/layout/app-shell.tsx";
import AppParallax from "@/layout/app-parallax.tsx";

export default function AppLayout({children}: {children: ReactNode})
{
    return (
        <AppShell>
            <AppParallax />
            <AppHeader />
            <AppContent>
                {children}
            </AppContent>
            <AppFooter />
        </AppShell>
    )
}