export type repoType = {
    repoName: string,
    ownerId: string,
    ownerName: string
    repoUrl: string,
    description: string,
    forked: boolean,
    visibility: string,
    defaultBranch: string
}

export type userType = {
    Name: string,
    id: string,
    nodeId: string
    profileImg: string
    followers: number
    bio: string,
    repoUrl: string
}