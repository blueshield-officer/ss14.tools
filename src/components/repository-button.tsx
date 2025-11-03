import { Button } from '@/components/ui/button';
import { Build } from '@/components/build';
import { setPermaCookie } from '@/components/logic/cookie';
import { useChosenBuilds } from '@/components/logic/variables';
import { Star, StarOff } from 'lucide-react';
import { useState } from 'react';


export function BuildButton({ build }) {
    const favorite_builds = useChosenBuilds(state => state).favorite

    const [starHover, setStarHover] = useState(false);

    return (
        <div className="relative">
            <Button variant="ghost" className="flex w-full h-14 justify-start items-center">
                <Build build={build} />
            </Button>
            <div
                onMouseEnter={() => setStarHover(true)}
                onMouseLeave={() => setStarHover(false)}
                className="absolute right-4 top-4 z-10 cursor-pointer">

                {favorite_builds.includes(build.id) ?
                    starHover ?
                        <StarOff color="#FFBF00" fill="#FFBF00" onClick={() => {
                            useChosenBuilds.getState().changeFavorite(build.id, 'remove')
                            setStarHover(false)
                        }} />
                        :
                        <Star color="#FFBF00" fill="#FFBF00" onClick={() => useChosenBuilds.getState().changeFavorite(build.id, 'remove')} />
                    :
                    starHover ?
                        <Star color="#FFBF00" onClick={() => {
                            useChosenBuilds.getState().changeFavorite(build.id, 'add')
                            setStarHover(false)
                        }} />
                        :
                        <Star onClick={() => {useChosenBuilds.getState().changeFavorite(build.id, 'add')}} />
                }
            </div>
        </div>
    )
}
