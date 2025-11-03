class AppShellProps {
    children?: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
                {children}
            </div>
        </>
    )
}