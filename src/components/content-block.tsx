import React from "react"
import TransparentCard from "@/components/transparent-card.tsx";

interface ContentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export default function ContentBlock({ children, className, ...props
}: ContentBlockProps) {
    return (
        <TransparentCard
            className={`p-5 rounded-xl ${className ?? ""}`}
            {...props}
        >
            {children}
        </TransparentCard>
    )
}
