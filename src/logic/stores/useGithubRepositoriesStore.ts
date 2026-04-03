import type {RepositoryInterface, RepositoryModuleIssueInterface} from "@/config/interfacesAPI.ts";
import {create} from "zustand";

type GithubRepositoryList = {
    repositories: Record<number, RepositoryInterface>;
    setRepositories: (repositories: Record<number, RepositoryInterface>) => void;

    issues: Record<number, RepositoryModuleIssueInterface[]>;
    setIssues: (issues: Record<number, RepositoryModuleIssueInterface[]>) => void;

    jobs: Record<number, number>;
    setJobs: (jobs: Record<number, number>) => void;
}
const useGithubRepositoryList = create<GithubRepositoryList>((set) => ({
    repositories: {},
    setRepositories: (repositories) => set({ repositories: repositories }),

    issues: {},
    setIssues: (issues: Record<number, RepositoryModuleIssueInterface[]>) => set({ issues: issues }),

    jobs: {},
    setJobs: (jobs: Record<number, number>) => set({ jobs: jobs }),
}))

export function useGithubRepositoryListRepositories() : Record<number, RepositoryInterface>
{
    return useGithubRepositoryList(state => state.repositories);
}
export function setGithubRepositoryListRepositories(repositories: Record<number, RepositoryInterface>) {
    useGithubRepositoryList.getState().setRepositories(repositories);
}


export function useGithubRepositoryListIssues() {
    return useGithubRepositoryList(state => state.issues || []) ;
}
export function getRepositoryListIssues() {
    return useGithubRepositoryList.getState().issues || [];
}
export function setGithubRepositoryListIssues(issues: Record<number, RepositoryModuleIssueInterface[]>) {
    useGithubRepositoryList.getState().setIssues(issues);
}
export function useGithubRepositoryListJobs() {
    return useGithubRepositoryList(state => state.jobs || {});
}
export function setGithubRepositoryListJobs(jobs: Record<number, number>) {
    useGithubRepositoryList.getState().setJobs(jobs);
}