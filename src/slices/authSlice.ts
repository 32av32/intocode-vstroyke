import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postLogin, postSignup} from "../createActions/authActions";
import {IAuthUser} from "../types/authTypes";

interface IInitialState {
    userId: string | null
    user: string | null
    token: string | null
    authStatus: number | null
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    userId: localStorage.getItem('userId'),
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    authStatus: null,
    loading: false,
    errors: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut (state) {
            state.authStatus = null
            state.userId = null
            state.user = null
            state.token = null
            localStorage.removeItem('userId')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder => {
        builder.addCase(postSignup.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false
            state.errors = null
            state.authStatus = action.payload
        })
            .addCase(postSignup.pending, (state) => {
                state.loading = true
                state.errors = null
                state.authStatus = null
            })
            .addCase(postSignup.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
                state.authStatus = null
            })
            .addCase(postLogin.fulfilled, (state, action: PayloadAction<IAuthUser>) => {
                state.loading = false
                state.errors = null
                state.userId = action.payload.id
                state.user = action.payload.email
                state.token = action.payload.token
                localStorage.setItem('userId', action.payload.id)
                localStorage.setItem('user', action.payload.email)
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(postLogin.pending, (state) => {
                state.loading = true
                state.errors = null
                state.userId = null
                state.user = null
                state.token = null
                localStorage.removeItem('userId')
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            })
            .addCase(postLogin.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
                state.userId = null
                state.user = null
                state.token = null
                localStorage.removeItem('userId')
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            })
    }
})

export default authSlice.reducer
export const { logOut } = authSlice.actions