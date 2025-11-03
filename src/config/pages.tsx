import Home from "@/pages/home.tsx"
import Database from "@/pages/database.tsx"

import ChemIcon from "@img/gameItems/jobs/chemist.png"
import EngiIcon from "@img/gameItems/jobs/engineer.png"

export interface PageConfigProps {
    name: string;
    slug: string;
    icon?: string;
    element: React.ReactNode;
    navigator: boolean,
}

export const PagesConfig: PageConfigProps[] = [
    {
        name: "Home",
        slug: "/",
        element: <Home />,
        navigator: false,
    },
    {
        name: "Chemistry",
        slug: "/chemistry",
        icon: ChemIcon,
        element: <Home />,
        navigator: true
    },
    {
        name: "Maps",
        slug: "/maps",
        icon: EngiIcon,
        element: <Home />,
        navigator: true
    },

    {
        name: "Database",
        slug: "/database",
        element: <Database />,
        navigator: false
    }
];
