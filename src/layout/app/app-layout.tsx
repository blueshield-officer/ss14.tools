import AppFooter from "@/layout/app/app-footer.tsx";
import AppShell from "@/layout/app/app-shell.tsx";
import AppHeader from "@/layout/app/app-header.tsx";
import AppContent from "@/layout/app/app-content.tsx";
import {Outlet} from "react-router-dom";

export default function AppLayout()
{
    return (
        <AppShell>
            <AppHeader />
            <AppContent>
                <Outlet />
            </AppContent>
            <AppFooter />
        </AppShell>
    )
}