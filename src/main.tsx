import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {type PageConfigProps, PagesConfig} from "@/config/pages.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const main = createBrowserRouter(
    PagesConfig.map((page: PageConfigProps) => (
        {
            path: `/${page.slug}`,
            element: page.element
        })
    )
)
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={main} />
        </QueryClientProvider>
    </StrictMode>
)