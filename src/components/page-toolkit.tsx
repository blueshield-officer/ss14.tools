import {type Appearance, useAppearance} from '@/hooks/use-appearance';
import {cn} from '@/lib/utils';
import {type LucideIcon, Monitor, Moon, SquarePlay, SquareX, Sun} from 'lucide-react';
import type {HTMLAttributes} from 'react';
import {useBackgroundSpaceParallaxOffset} from "@/logic/variables.ts";
import {useTheme} from "@/hooks/use-theme.tsx";

const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
];

export function AppearanceToggleButton({ className = '', ...props }: HTMLAttributes<HTMLButtonElement>) {
    const { mode, setMode } = useTheme();
    const activateTab = tabs.find(({ value }) => value === mode);

    const { value, icon: Icon, label } = activateTab;
    return (
        <button
            key={value}
            onClick={() => {
                let nextAppearance
                switch (value) {
                    case 'light':
                        nextAppearance = 'dark';
                        break;
                    case 'dark':
                        nextAppearance = 'system';
                        break;
                    case 'system':
                        nextAppearance = 'light';
                }
                setMode(nextAppearance);
            }}
            className={cn(
                'flex items-center rounded-md px-3.5 py-1.5',
                mode === value
                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
            )}
        >
            <Icon className="-ml-1 h-4 w-4" />
        </button>
    )
}

export function ParallaxToggleButton({ animation }: { animation: boolean }) {
    const { appearance } = useAppearance();
    const value = tabs.find(({value}) => value === appearance)?.value;
    return (
        <button
            key={"animation-toogle"}
            onClick={() => {
                if (animation) {
                    useBackgroundSpaceParallaxOffset.getState().setAnimation(false)
                } else {
                    useBackgroundSpaceParallaxOffset.getState().setAnimation(true)
                }
            }}
            className={cn(
                'flex items-center rounded-md px-3.5 py-1.5 ',
                appearance === value
                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
            )}
        >
            {animation ?
                <SquarePlay className="-ml-1 h-4 w-4" />
                :
                <SquareX  className="-ml-1 h-4 w-4" />
            }
        </button>
    )
}