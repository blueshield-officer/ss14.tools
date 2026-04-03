import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {type PageConfigProps, PagesConfig} from "@/config/pages";
import ChoseRepositoryGate from "@/routing/gates/chose-repository-gate";
import AppLayout from "@/layout/app/app-layout";
import MenuLayout from "@/layout/menu/menu-layout";
import Welcome from "@/pages/welcome";
import Shell from "@/layout/shell"


const router = createBrowserRouter([
    {
        element: <Shell />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        element: <ChoseRepositoryGate />,
                        children: PagesConfig.map((page: PageConfigProps) => ({
                            path: `/${page.slug}`,
                            element: page.element
                        }))
                    }
                ]
            },
            {
                element: <MenuLayout />,
                children: [
                    {
                        path: "/welcome",
                        element: <Welcome />
                    }
                ]
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)