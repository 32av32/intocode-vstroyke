import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAccount, patchAccount} from "../createActions/userActions";
import {IUser} from "../types/userType";
import {postLogin, postSignup} from "../createActions/authActions";
import {IAuth} from "../types/authTypes";

interface IInitialState {
    user: IUser
    token: string | null
    status: number | null
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    user: {
        _id: localStorage.getItem('userId') ?? '',
        email: '',
        name: '',
        organization: '',
        image: '',
        role: '',
        phone: '',
        createdDate: ''
    },
    token: localStorage.getItem('token'),
    status: null,
    loading: false,
    errors: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut (state) {
            state.user = {
                _id: '',
                email: '',
                name: '',
                organization: '',
                image: '',
                role: '',
                phone: '',
                createdDate: ''
            }
            state.token = null
            state.status = null
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder => {
        builder.addCase(postSignup.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false
            state.errors = null
            state.status = action.payload
        })
            .addCase(postSignup.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(postSignup.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(postLogin.fulfilled, (state, action: PayloadAction<IAuth>) => {
                state.loading = false
                state.errors = null
                state.token = action.payload.token
                state.user = action.payload.user
                localStorage.setItem('userId', action.payload.user._id)
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(postLogin.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(postLogin.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(getAccount.fulfilled, (state, action: PayloadAction<IUser>) => {
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
export const { logOut } = userSlice.actions