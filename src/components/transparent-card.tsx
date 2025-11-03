import {useTheme} from "@/hooks/use-theme.tsx";


interface TransparentCardProps {
    className?: string;
    children?: React.ReactNode
}
export default function TransparentCard ({className, children}: TransparentCardProps) {
    const {getTheme} = useTheme();
    const backgroundColor =
        getTheme() === "light"
            ? "rgba(189,189,189,0.6)"
            : getTheme() === "dark"
                ? "rgba(17, 25, 40, 0.60)"
                : "";


    return (
        <div style={{
            transition: "0.3s ease-in-out",
            backdropFilter: "blur(13px) saturate(180%)",
            backgroundColor: backgroundColor,
        }}
             className={className}
        >
            {children}
        </div>
    )
}