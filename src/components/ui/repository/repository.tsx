import RepositoryTemplate from "@/components/ui/repository/repository-template.tsx";
import {useGithubRepositoryListRepositories} from "@/logic/stores/useGithubRepositoriesStore.ts";

export default function Repository(
    { repositoryId, type = "default" }: { repositoryId: number | null, type?: string }
) {
    const repositories = useGithubRepositoryListRepositories();

    if (repositoryId === null) {
        return (
            <RepositoryTemplate id={null}>
                <p className="font-bold">Chose Repository</p>
            </RepositoryTemplate>
        )
    }

    const repository = repositories[repositoryId];

    if (!repository) {
        return (
            <RepositoryTemplate id={repositoryId}>
                <div className="items-start gap-1 flex flex-col">
                    <div className="h-3.5 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-20 bg-muted rounded animate-pulse opacity-60" />
                </div>
            </RepositoryTemplate>
        );
    }

    return (
        <RepositoryTemplate id={repositoryId}>
            <div className="items-start">
                <p className="text-sm font-bold">{repository.name}</p>
                <p className="text-xs text-stone-400 -mt-1.5">{repository.organization}</p>
            </div>
        </RepositoryTemplate>
    );
}