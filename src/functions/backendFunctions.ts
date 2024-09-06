import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL
})

export const getRepoName = async (repoName: string) => {
    try {
        const { data } = await axiosInstance.get("/?repoName=" + repoName)
        return data
    } catch (error: any) {
        console.log(error)
    }
}

export const getFollowersOfUser = async (ownerId: string, ownerName: string) => {
    try {
        const { data } = await axiosInstance.get("/getFollowersOfUser?ownerId=" + ownerId + "&ownerName=" + ownerName);
        return data
    } catch (error: any) {
        console.log(error)
    }
}

export const isMutual = async (userId: string, followerIds: string[], userName: string) => {
    try {
        const { data } = await axiosInstance.get("/isMutual?data=" + JSON.stringify({ userId, followerIds, userName }))
        return data
    } catch (error: any) {
        console.log(error)
    }
}