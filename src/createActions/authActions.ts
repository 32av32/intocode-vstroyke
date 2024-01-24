import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuth} from "../types/authTypes";
import axios from "axios";
import {Urls} from "../utils/urls";

export const postSignup = createAsyncThunk('postSignup', async (data: {name: string, email: string, password: string}, thunkApi) => {
    try {
        const response = await axios.post(Urls.AuthSignup, data)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue('Ошибка при регистрации')
        }
        return response.status
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при регистрации')
    }
})

export const postLogin = createAsyncThunk('postLogin', async (data: {email: string, password: string}, thunkApi) => {
    try {
        const response = await axios.post(Urls.AuthLogin, data)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue('Ошибка при авторизации')
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при авторизации')
    }
})