import AppLayout from "@/layout/app-layout.tsx";
import ContentBlock from "@/components/content-block.tsx";
import {useRepositoryList} from "@/logic/variables.ts";
import Repository from "@/components/repository.tsx";

export default function Database() {
    const repositories = useRepositoryList(state => state.repositories);
    const unverifiedIds: number[] = []

    return (
        <AppLayout>
            <ContentBlock>
                <h1>Our Database</h1>
                <p>On this page you can find all repositories we monitor and have in our database, also how to add yours own.</p>
            </ContentBlock>
            <ContentBlock>
                <h3>Verified</h3>
                <div className={"flex flex-wrap gap-2 "}>
                    {Object.keys(repositories).map((idString) => {
                        const id = parseInt(idString)
                        if (repositories[id].status === 1)
                        {
                            return (
                                <Repository repository={repositories[id]} type={"github"}/>
                            )
                        }
                        else {
                            unverifiedIds.push(id)
                        }

                    })}
                </div>
            </ContentBlock>
        </AppLayout>
    )
}