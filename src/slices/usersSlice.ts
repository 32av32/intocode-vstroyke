import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../types/userType";
import {getUserProfile} from "../createActions/userActions";

type IUserProfile = Pick<IUser, '_id' | 'name' | 'image' | 'organization' | 'createdDate'>

interface IInitialState {
    user: IUserProfile
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    user: {
        _id: '',
        name: '',
        organization: '',
        image: '',
        createdDate: ''
    },
    loading: false,
    errors: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
            state.loading = false
            state.errors = null
            state.user = action.payload
        })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
    }
})

export default usersSlice.reducer