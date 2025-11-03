export interface RepositoryInterface {
    id: number,
    name: string,
    organization: string,
    localization: string | null,
    owner_id: string,
    auto_sync: number,
    status: number,
    updated_at: string | null,
}