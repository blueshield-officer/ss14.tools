import centrifuge from '@img/gameItems/chemistry/centrifuge.png'
import electrolysis from '@img/gameItems/chemistry/electrolysis.png'
import grinder from '@img/gameItems/chemistry/grinder.png'

export default function Tool (
    {tool} : {tool: string}
) {

    let toolImage
    switch (true) {
        case tool === "centrifuge":
            toolImage = centrifuge
            break
        case tool === "electrolysis":
            toolImage = electrolysis
            break
        case tool === "grinder":
            toolImage = grinder
            break
        default:
            toolImage = grinder
    }

    return (
        <div
            className="flex items-center p-1 rounded-md grow-0 border"
            style={{
                border: "3px solid",
            }}

        >
            <img src={toolImage} className="mr-2" style={{imageRendering: "pixelated"}} />
            <p>{tool}</p>
        </div>
    )
}