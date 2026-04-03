import loadingBar from "@img/ui/action-bar.png"
import {useEffect, useRef, useState} from 'react';

import ConradSnyder from "@img/characters/ConradSnyder-East.png";
import RamoneEndsley from "@img/characters/RamoneEndsley-South.png";
import CherryJam from "@img/characters/CherryJam-South.png";
import LoadingTemplate from "@/components/ui/loaders/loading-template.tsx";



export default function LongLoading() {
    const [count, setCount] = useState(0);
    const progressBarRefs = useRef<HTMLSpanElement[]>([])

    const characters = [
        {
            name: 'RamoneEndsley',
            phrase: 'You got double barrel?',
            image: RamoneEndsley
        },
        {
            name: 'CherryJam',
            phrase: 'Gulp',
            image: CherryJam
        },
    ]
    const [character] = useState(() => characters[Math.floor(Math.random() * characters.length)]);

    useEffect(() => {

        let i = 0;
        const interval = setInterval(() => {
            i++;
            setCount(i);
            if (i >= 4) clearInterval(interval);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (count > 0) {
            if (progressBarRefs.current[count - 1]) {
                animateBar(progressBarRefs.current[count - 1]);
            }
        }
    }, [count]);

    return (
        <LoadingTemplate>
            <div className={'flex align-bottom h-105 self-center justify-center z-20'}>
                <div className={'flex flex-col justify-end items-center'}>
                    {Array.from({ length: count }).map((_, i) => (
                        <div className={'relative'}>
                            <img
                                key={i}
                                className="h-12"
                                src={loadingBar}
                                style={{ imageRendering: "pixelated" }}
                                alt="loading"
                            />
                            <div
                                className={'absolute flex'}
                                style={{
                                    top: '0',
                                    left: '0',
                                    margin: '21px 14px',
                                    width: 'calc(100% - 28px)',
                                }}>
                                <span
                                    style={{
                                        height: '7px',
                                    }}
                                    ref={(el) => {
                                        if (el) progressBarRefs.current[i] = el
                                    }}
                                ></span>
                            </div>
                        </div>
                    ))}
                    <img
                        className={"h-50 mt-5"}
                        style={{imageRendering: "pixelated"}}
                        src={ConradSnyder}
                        alt="conrad-snyder" />
                </div>
                <div
                    style={{marginLeft: '-70px'}}
                    className={'flex flex-col justify-end'}>
                    <div className={'self-center relative'} style={{
                        borderRadius: '2px',
                        border: '3px solid #313143',
                        backgroundColor: "rgba(49, 49, 67, 0.6)",
                        marginBottom: '10px',
                        padding: '10px 5px 5px 5px ',
                    }}>
                        <span style={{
                            textWrap: 'nowrap',
                            top: '-10px',
                            color: '#115DFC',
                            left: '50%',
                            transform: `translate(-50%, -5px)`,
                            fontWeight: '900'
                        }}
                              className={'absolute accent-blue-600'}>
                            {character.name.replace('_', ' ')}
                        </span>
                        <span>{character.phrase}</span>
                    </div>
                    <img
                        style={{
                            imageRendering: 'pixelated',
                            // marginBottom: '-50px',
                            // marginLeft: '-10px'
                        }}
                        src={character.image}
                        className={'h-50'}
                        alt="second-character"/>
                </div>
            </div>
        </ LoadingTemplate>
    )
}

async function animateBar(progressBar: HTMLSpanElement)
{
    if (progressBar){
        let progress = 0
        const degreePerOne = 120 / 100
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`
            progressBar.style.backgroundColor = `hsl(${degreePerOne * progress}, 100%, 50%)`
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 60)
    }
}
