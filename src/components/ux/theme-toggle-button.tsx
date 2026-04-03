import ToggleButton from "@/components/essential/toggle-button.tsx";
import {setMode, useMode, type WebsiteThemeModes} from "@/logic/hooks/useTheme.ts";
import {type LucideIcon, Monitor, Moon, Sun} from "lucide-react";

const icons: Record<WebsiteThemeModes, LucideIcon> =
    {
        'light': Sun,
        'dark': Moon,
        'system': Monitor,
    }
export default function ThemeToggleButton() {
    const mode = useMode();
    const Icon = icons[mode];

    return (
        <ToggleButton
            onClick={() => {
                const cycle = { light: 'dark', dark: 'system', system: 'light' };
                setMode(cycle[mode] as WebsiteThemeModes);
            }}
        >
            <Icon className="-ml-1 h-4 w-4" />
        </ToggleButton>
    )
}