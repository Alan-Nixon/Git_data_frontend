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
    _id: string,
    Name: string,
    id: string,
    nodeId: string
    profileImg: string
    followers: number
    bio: string,
    repoUrl: string,
    mutual: boolean,
    location: string,
    blog: string
}

export type intialType = {
    gitUserData: userType | null
    repo: repoType[] | []
}

export type editUserType = {
    _id: string,
    location: string,
    bio: string,
    blog: string
}

export interface followersInterface {
    owner: userType,
    setGitUser: (repoName: string) => void
    setName: (Name: string) => void
}