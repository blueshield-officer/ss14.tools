import tide from "@img/misc/tide.png"
import never_giveup from "@img/misc/never_giveup.png"
import mango from "@img/misc/mango.gif"
import headrev from "@img/misc/headrev.png"
import ContentBlock from "@/components/content-block.tsx";
import Quote from "@/components/sections/pages/home/quote.tsx";
import Patreon from "@img/misc/patreon.jpg"

export default function Home() {
    return (
        <>
            <ContentBlock>
                <div className="flex h-full justify-between gap-4 mb-4">
                    <Quote text={"Never give up. Defeat is not a failure, doing nothing is."} image={never_giveup} />

                    <Quote text={"None became a captain right away, everybody been a tider once."} image={tide} />

                    <Quote text={"While other have everything, and you nothing, you still have the unkillable spirit."} image={headrev} />
                </div>
                <p className="text-center">Think. Beyond. Game.</p>
            </ContentBlock>

            <ContentBlock>
                <h1 className="font-bold text-2xl mb-2">
                    About
                </h1>
                <p className="mb-4">
                    Hello friend. I made this website in love of my favorite game, in order to stop playing in it and wasting time, but also to be still somehow connected to it.
                    <br />
                    As of right now, I live not the best part of my life. Any of your donation on Patreon will be highly valued.
                    First part goes of course on server hosting, the rest I use to pay for my needs. Thank you.

                </p>
                <a href="https://patreon.com/ss14tools" target="_blank" rel="noreferrer">
                    <img src={Patreon} alt="Patreon" className="rounded-xl w-30" />
                </a>

            </ContentBlock>

            <ContentBlock>
                <h1 className="font-bold text-2xl mb-2">
                    Support Us
                </h1>

            </ContentBlock>
        </>
    )
}