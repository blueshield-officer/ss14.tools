import Home from "@/pages/home.tsx"
import Database from "@/pages/database.tsx"

import ChemIcon from "@img/gameItems/jobs/chemist.png"
import EngiIcon from "@img/gameItems/jobs/engineer.png"
import ERTLeaderIcon from "@img/gameItems/jobs/ERTLeader.png"
import Strategies from "@/pages/strategies.tsx";
import Chemistry from "@/pages/chemistry.tsx";
import {Maps} from "@/pages/maps.tsx";
import React from "react";

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
        element: <Chemistry />,
        navigator: true
    },
    {
        name: "Maps",
        slug: "/maps",
        icon: EngiIcon,
        element: <Maps />,
        navigator: true
    },
    {
        name: "Strategies",
        slug: "/strategies",
        icon: ERTLeaderIcon,
        element: <Strategies />,
        navigator: true
    },

    {
        name: "Database",
        slug: "/database",
        element: <Database />,
        navigator: false
    }
];
