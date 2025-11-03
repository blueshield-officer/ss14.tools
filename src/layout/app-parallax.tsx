import { useEffect, useRef } from 'react';
import { useBackgroundSpaceParallaxOffset } from '@/logic/variables.ts';
import { useAppearance } from '@/hooks/use-appearance';
import {AppearanceToggleButton, ParallaxToggleButton} from "@/components/page-toolkit.tsx";


import wBackground from '@img/parallax/w-background.png';
import bBackground from '@img/parallax/b-background.png';
import wNoise from '@img/parallax/w-noise.png';
import bNoise from '@img/parallax/b-noise.png';
import {useTheme} from "@/hooks/use-theme.tsx";
export default function AppParallax() {


    const noiseRef = useRef(null);
    const backgroundRef = useRef(null);
    const mainParallaxRef = useRef(null);
    const animation = useBackgroundSpaceParallaxOffset(state => state.animation)
    const { getTheme } = useTheme();



    useEffect(() => {
        let frameId: number;
        const animate = (() => {
            if (!animation) {
                cancelAnimationFrame(frameId);
                return
            };
            const background = useBackgroundSpaceParallaxOffset.getState().background
            const noise = useBackgroundSpaceParallaxOffset.getState().noise

            const neBackground = background + 0.3
            const newNoise = noise + 0.1
            useBackgroundSpaceParallaxOffset.getState().setBackground(neBackground)
            useBackgroundSpaceParallaxOffset.getState().setNoise(newNoise)

            if (noiseRef.current) {
                noiseRef.current.style.backgroundPosition = `${neBackground}px ${neBackground}px`;
            }
            if (backgroundRef.current) {
                backgroundRef.current.style.backgroundPosition = `${newNoise}px ${newNoise}px`;
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
                        backgroundImage: `url(${getTheme() === 'light' ? wBackground : bBackground})`,
                        backgroundSize: '35%',
                        backgroundRepeat: 'repeat',
                    }}/>
                <div
                    id="parallax-noise"
                    ref={noiseRef}
                    className="absolute h-full w-full"
                    style={{
                        transition: "background-image 0.3s ease-in-out",
                        backgroundImage: `url(${getTheme() === 'light' ? wNoise : bNoise})`,
                        backgroundSize: '35%',
                        backgroundRepeat: 'repeat',
                    }}/>
            </div>
            <div className='grid fixed bottom-3 right-3 z-10 gap-1'>
                <ParallaxToggleButton animation={animation} />
                <AppearanceToggleButton />
            </div>
        </>
    )
}