import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAccount, patchAccount} from "../createActions/userActions";
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
        builder.addCase(getAccount.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.loading = false
            state.errors = null
            state.user = action.payload
        })
            .addCase(getAccount.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getAccount.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(patchAccount.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false
                state.errors = null
                state.user = action.payload
            })
            .addCase(patchAccount.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(patchAccount.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
    }
})

export default userSlice.reducer