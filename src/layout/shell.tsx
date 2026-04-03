import Parallax from "@/layout/parallax.tsx";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {loadGithub, loadGithubRepositoriesData} from "@/logic/api/dataLoaders.ts";

export default function Shell ()
{
    useEffect(() => {
        loadGithubRepositoriesData()
        loadGithub()
    }, [])

    return (
        <>
            <Parallax />
            <Outlet />
        </>
    )
}