import React, { type ReactNode, type HTMLAttributes } from "react";

interface ButtonV2Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    active?: boolean;
    ref?: React.Ref<HTMLDivElement>;
}

export default function ButtonV2({
                                     children,
                                     className = "",
                                     active = false,
                                     ref,
                                     ...props
                                 }: ButtonV2Props) {
    return (
        <div
            ref={ref}
            className={`${active ? "bg-muted" : "hover:bg-muted"} rounded-md shadow-md ${className}  cursor-pointer`}
            style={{
                backdropFilter: "blur(13px) saturate(180%)",
            }}
            {...props}
        >
            {children}
        </div>
    );
}