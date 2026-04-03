import { useEffect, useRef } from 'react';
import wBackground from '@img/parallax/w-background.png';
import bBackground from '@img/parallax/b-background.png';
import wNoise from '@img/parallax/w-noise.png';
import bNoise from '@img/parallax/b-noise.png';
import {useBackgroundAnimation} from "@/logic/hooks/useBackround.ts";
import { useTheme} from "@/logic/hooks/useTheme.ts";
import ThemeToggleButton from "@/components/ux/theme-toggle-button.tsx";
import AnimationToggleButton from "@/components/ux/animation-toggle-button.tsx";
export default function Parallax() {
    const theme = useTheme();

    const noiseRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const mainParallaxRef = useRef<HTMLDivElement>(null);
    const animation = useBackgroundAnimation()

    const backgroundPos = useRef(0);
    const noisePos = useRef(0);

    useEffect(() => {
        let frameId: number;
        const animate = (() => {
            if (!animation) {
                cancelAnimationFrame(frameId);
                return
            };

            backgroundPos.current += 0.3
            noisePos.current += 0.1

            if (noiseRef.current) {
                noiseRef.current.style.backgroundPosition = `${backgroundPos.current}px ${backgroundPos.current}px`;
            }
            if (backgroundRef.current) {
                backgroundRef.current.style.backgroundPosition = `${noisePos.current}px ${noisePos.current}px`;
            }
            frameId = requestAnimationFrame(animate);
        })
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [animation]);

    return (
        <>
            <div ref={mainParallaxRef} className="fixed h-screen w-screen overflow-hidden">
                <div
                    id="parallax-background"
                    ref={backgroundRef}
                    className="absolute h-full w-full"
                    style={{
                        transition: "background-image 0.3s ease-in-out",
                        backgroundImage: `url(${theme === 'light' ? wBackground : bBackground})`,
                        backgroundSize: '35%',
                        backgroundRepeat: 'repeat',
                    }}/>
                <div
                    id="parallax-noise"
                    ref={noiseRef}
                    className="absolute h-full w-full"
                    style={{
                        transition: "background-image 0.3s ease-in-out",
                        backgroundImage: `url(${theme  === 'light' ? wNoise : bNoise})`,
                        backgroundSize: '35%',
                        backgroundRepeat: 'repeat',
                    }}/>
            </div>
            <div className='grid fixed bottom-3 right-3 z-10 gap-1'>
                <ThemeToggleButton />
                <AnimationToggleButton />
            </div>
        </>
    )
}