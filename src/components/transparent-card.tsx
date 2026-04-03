import React from "react";

interface TransparentCardProps {
    blur?: number;
    className?: string;
    children?: React.ReactNode
}
export default function TransparentCard (
    {
        blur = 13,
        className,
        children,
        ...props}: TransparentCardProps) {

    return (
        <div
            {...props}
            style={{
            transition: "0.3s ease-in-out",
            backdropFilter: `blur(${blur}px) saturate(180%)`,
        }}
             className={`bg-card ${className}`}
        >
            {children}
        </div>
    )
}