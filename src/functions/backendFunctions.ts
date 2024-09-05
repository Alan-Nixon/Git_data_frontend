import axios from 'axios'

export const getRepoName = async (repoName: string) => {
    try {
        const { data } = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "/?repoName=" + repoName)
        return data
    } catch (error: any) {
        console.log(error)
    }
}