import LoadingTemplate from "@/components/ui/loaders/loading-template.tsx";
import toolbox from '@img/gameItems/misc/toolbox.png'

export default function ShortLoading() {
    return (
        <LoadingTemplate>
            <img className="w-full h-full animate-spin" src={toolbox} alt="Loading template" style={{ imageRendering: "pixelated" }}/>
        </LoadingTemplate>
    )
}