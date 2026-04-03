import {useChemistryStoreReagents} from "@/logic/stores/useChemistryStore.ts";
import {useEffect, useRef, useState} from "react";
import invert from "@/logic/invert.ts";
import {colorNameToHex, isHexColor} from "@/logic/utils.ts";

export default function Reagent (
    {reagentId, amount}: { reagentId: string, amount: number }
)
{
    const reagents = useChemistryStoreReagents()
    const reagent = reagents[reagentId]

    const [moreInfo, setMoreInfo] = useState<boolean>(false)

    if (!isHexColor(reagent.color)) reagent.color = colorNameToHex(reagent.color)

    const popoutRef = useRef(null);
    const [popoutOffset, setPopoutOffset] = useState(0);

    useEffect(() => {
        if (moreInfo && popoutRef.current) {
            const rect = popoutRef.current.getBoundingClientRect();
            const padding = 8; // px from screen edge

            let offset = 0;
            if (rect.left < padding) {
                offset = padding - rect.left;
            } else if (rect.right > window.innerWidth - padding) {
                offset = window.innerWidth - padding - rect.right;
            }
            setPopoutOffset(offset);
        }
    }, [moreInfo]);

    return (
      <div className="relative">
          <div
              className="rounded-md p-1 font-semibold grow-0 cursor-pointer"
              style={{
                  color: invert(reagent.color, true),
                  border: "3px solid",
                  borderColor: reagent.color,
                  backgroundColor: reagent.color + "90",
              }}

              onMouseEnter={() => setMoreInfo(true)}
              onMouseLeave={() => setMoreInfo(false)}
          >
              <p><span className="font-bold">{amount}u</span> {reagent.name}</p>

          </div>


          {moreInfo && (
              <div
                  ref={popoutRef}
                  style={{
                      border: "3px solid",
                      transform: `translateX(calc(-50% + ${popoutOffset}px))`,
                  }}
                  className="absolute z-50 top-10 w-100 grow rounded-md border bg-muted left-1/2 overflow-hidden shadow-xl"
              >
                  <p
                      className="text-center font-bold"
                      style={{
                          color: invert(reagent.color, true),
                          backgroundColor: reagent.color,
                      }}
                  >{reagent.name} {reagent.threshold !== null && (`(${reagent.threshold}u)`)}</p>

                  <div className="flex flex-col p-2">
                      <p className="text-sm">{reagent.description}</p>
                  </div>
              </div>
          )}
      </div>
    )
}