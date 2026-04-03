import GithubIcon from "@img/misc/github.svg?react"
import ContentBlock from "@/components/content-block.tsx";
import {srcPath} from "@/logic/global-variables.ts";
import {
    Clock,
    Cloud,
    CloudOff,
    RefreshCw,
    RefreshCwOff,
    ShieldCheck,
    ShieldQuestionMark,
    ShieldX
} from "lucide-react";
import ModuleState from "@/components/module-state.tsx";
import TransparentCard from "@/components/transparent-card.tsx";
import StateBadge from "@/components/state-badge.tsx";
import {daysFromDate} from "@/logic/utils.ts";

export default function Database() {
    const unverifiedIds: number[] = []



    return (
        <>
            <ContentBlock>
                <h1>Our Database</h1>
                <p>On this page you can find all repositories we monitor and have in our database, also how to add yours own.</p>
            </ContentBlock>
            <ContentBlock>
                <div className={"flex flex-wrap gap-2 "}>
                    {Object.keys(repositories).map((idString) => {
                        const repositoryId = parseInt(idString)
                        const repositoryData = repositories[repositoryId]
                        const updated_at = repositoryData.updated_at !== null ? daysFromDate(new Date(repositoryData.updated_at), true) : "Data Not Downloaded"
                        const updatedAtState = repositoryData.updated_at !== null
                        const syncState = repositoryData.auto_sync === 1

                        return (
                            <TransparentCard className={"rounded-xl"}>
                                <div className={"flex p-2 justify-between bg-background rounded-t-xl"}>
                                    <div className={"flex"}>
                                        <img src={srcPath('/repository_data/' + repositoryData.id + '/logo.png')} alt={repositoryData.id.toString()} className="w-9 h-9 rounded-md mr-2"/>
                                        <div>
                                            <p className="text-sm font-bold">{repositoryData.name}</p>
                                            <p className="text-xs text-stone-400">{repositoryData.organization}</p>

                                            <p className={"self-end"}></p>
                                        </div>
                                    </div>
                                    <a href={`https://github.com/${repositoryData.organization}/${repositoryData.name}`} target="_blank" rel="noreferrer" className={"h-9 flex items-center"}>
                                        <GithubIcon color={"theme-primary-foreground"} className={"shrink"} />
                                    </a>
                                </div>
                                <div className={"flex flex-col p-2 select-none"}>
                                    <div className="flex justify-between gap-5">
                                        <div className={"flex gap-2"}>
                                            <StateBadge icon={syncState ? <RefreshCw /> : <RefreshCwOff />} text={"Auto Sync"} state={syncState} />
                                            <StateBadge icon={updatedAtState ? <Cloud /> : <CloudOff/>} text={updated_at} state={repositoryData.updated_at !== null} />
                                            <StateBadge icon={repositoryData.status === 1 ? <ShieldCheck /> : repositoryData.status === -1 ? <ShieldX /> : <ShieldQuestionMark />}  state={repositoryData.status} />
                                        </div>
                                        {jobs[repositoryId] &&
                                            <StateBadge icon={<Clock />} text={`Jobs: ${jobs[repositoryId]}`} state={0} />
                                        }
                                    </div>
                                    {moduleIssues[repositoryId] &&
                                        <>
                                            <div className={"flex flex-wrap gap-1 mt-2"}>
                                                {
                                                    moduleIssues[repositoryId] &&
                                                    (moduleIssues[repositoryId].map((issue) => {
                                                        return (
                                                            <ModuleState issue={issue}/>
                                                        )
                                                    }))
                                                }
                                            </div>
                                        </>
                                    }
                                </div>
                            </TransparentCard>
                        )


                    })}
                </div>
            </ContentBlock>
        </>
    )
}

