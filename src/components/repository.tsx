import {srcPath} from "@/logic/global-variables.ts";
import type {RepositoryInterface} from "@/config/interfaces.ts";
import { Link } from 'lucide-react';

export default function Repository( {repository, type = "default" }: { repository: RepositoryInterface, type: string } ) {

    if (type === "github") {
        return (
            <div className={"flex dark:bg-blue-950 bg-white p-2 rounded-xl"}>
                <img src={srcPath('/RepositoriesData/' + repository.id + '/logo.png')} alt={repository.id.toString()} className="w-9 h-9 rounded-md mr-2"/>
                <div>
                    <p className="text-sm font-bold">{repository.name}</p>
                    <p className="text-xs text-stone-400">{repository.organization}</p>
                    <div className="flex items-center  mt-2 ">
                        <Link className={"h-4"} />
                        <a className="accent-secondary" target={"_blank"} href={`https://github.com/${repository.organization}/${repository.name}`}>
                            https://github.com/{repository.organization}/{repository.name}
                        </a>
                    </div>
                    <p className={"self-end"}></p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex grow items-center text-left select-none">
            <img src={srcPath('/RepositoriesData/' + repository.id + '/logo.png')} alt={repository.id.toString()} className="w-7 h-7 rounded-md mr-2"/>
            <div>
                <p className="text-sm font-bold">{repository.name}</p>
                <p className="text-xs text-stone-400">{repository.organization}</p>
            </div>
        </div>
    )
}
