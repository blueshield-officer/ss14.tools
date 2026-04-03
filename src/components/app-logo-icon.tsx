import logo from '/favicon.png';

export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <img src={logo} alt="logo" className={`rounded-xl ${className}`} />
    );
}