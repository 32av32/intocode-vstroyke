import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Urls} from "../utils/urls";

export const getProfile = createAsyncThunk('getProfile', async (id: string, thunkApi) => {
    try {
        const response = await axios.get(`${Urls.Users}/${id}`)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при получении профиля')
    }
})

export const patchProfile = createAsyncThunk('postProfileImage', async ({id, form}: { id: string, form: FormData }, thunkApi) => {
    try {
        const response = await axios.patch(`${Urls.Users}/${id}`, form, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при получении профиля')
    }
})