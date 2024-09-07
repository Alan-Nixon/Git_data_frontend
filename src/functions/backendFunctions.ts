import axios from 'axios'
import { editUserType } from './interface_types'

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

export const deleteRepoGit = async (userId: string) => {
    try {
        const { data } = await axiosInstance.get("/deleteRepoGit?userId=" + userId)
        return data
    } catch (error: any) {
        console.log(error)
    }
}

export const editDetails = async (editUserData: editUserType) => {
    try {
        const { data } = await axiosInstance.post("/editDetails", editUserData);
        return data
    } catch (error: any) {
        console.log(error)
    }
}