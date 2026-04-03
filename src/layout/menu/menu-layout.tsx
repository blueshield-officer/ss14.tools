import {Outlet} from "react-router-dom";
import MenuContent from "@/layout/menu/menu-content.tsx";

export default function MenuLayout() {
    return (
        <>
            <MenuContent>
                <Outlet />
            </MenuContent>
        </>
    )
}