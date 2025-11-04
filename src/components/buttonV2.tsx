import type {ReactNode} from "react";

export default function ButtonV2 ({children}: {children: ReactNode})
{
    return (
        <div className={
            "hover:bg-muted transition-colors rounded-lg shadow-md "
        }>
            {children}
        </div>
    )
}