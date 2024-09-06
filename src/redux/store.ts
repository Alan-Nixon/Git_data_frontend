import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slice.ts'

export const Store = configureStore({
    reducer:{
        userData:UserSlice
    }
}) 