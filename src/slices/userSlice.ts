import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getProfile, patchProfile} from "../createActions/userActions";
import {IUser} from "../types/userType";

interface IInitialState {
    user: IUser
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    user: {
        _id: '',
        email: '',
        name: '',
        organization: '',
        image: '',
        role: 'user',
        phone: '',
        createdDate: ''
    },
    loading: false,
    errors: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.loading = false
            state.errors = null
            state.user = action.payload
        })
            .addCase(getProfile.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(patchProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false
                state.errors = null
                state.user = action.payload
            })
            .addCase(patchProfile.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(patchProfile.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
    }
})

export default userSlice.reducer