import AppLayout from "@/layout/app-layout.tsx";
import tide from "@img/misc/tide.png"
import ContentBlock from "@/components/content-block.tsx";

export default function Home() {
    return (
        <AppLayout>
            <ContentBlock>
                <div className="flex h-full justify-center">
                    <div className="w-64 bg-white rounded-2xl">
                        <p className="p-2 text-black select-none">
                            <span className="font-black">&laquo; Its fun to kill secoffs, but not that much fun as doing same thing with 10 second cooked meth running in a grilled up maints &raquo;</span>
                            <br />
                            <span className="italic">(Grey Tide, 1984 - {(new Date()).getFullYear()})</span>
                        </p>
                        <img src={tide} alt="tide" className="rounded-b-2xl"  />
                    </div>
                </div>
            </ContentBlock>
        </AppLayout>
    )
}