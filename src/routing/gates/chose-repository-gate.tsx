import {isSetChosenRepository} from "@/logic/hooks/useUserRepositories.ts";
import {Navigate, Outlet} from "react-router-dom";

export default function ChoseRepositoryGate ()
{
    if (!isSetChosenRepository()) return <Navigate to="welcome" replace={true} />

    return <Outlet />
}