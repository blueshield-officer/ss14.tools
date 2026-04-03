import TransparentCard from "@/components/transparent-card.tsx";
// @ts-ignore
import SS14 from "@img/misc/ss14.svg?react";



export default function Welcome ()
{
    return (
        <>
            <TransparentCard className="absolute top-[40%] left-1/2 -translate-x-1/2 p-10 rounded-xl">
                <div className="flex justify-center items-center self-center">
                    <SS14 className="w-18 h-18" />
                    <p style={{ fontSize: "50px" }} className="font-extrabold">Tools</p>
                </div>
                <p className="text-secondary">Above supose to be super cool logo instead of raw text</p>
            </TransparentCard>
        </>
    )
}