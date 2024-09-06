import { createSlice } from '@reduxjs/toolkit'
import { intialType } from '../functions/interface_types'

const initialState:intialType = {
    gitUserData: null,
    repo: []
}


const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState,
    reducers: {
        setGitUserData: (state, action) => {
            state.gitUserData = action.payload
        },
        setUserRepo: (state, action) => {
            state.repo = action.payload
        }
    }
})

export const { setGitUserData, setUserRepo } = userDataSlice.actions
export default userDataSlice.reducer
