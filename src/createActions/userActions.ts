import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Urls} from "../utils/urls";

export const getAccount = createAsyncThunk('getAccount', async (_, thunkApi) => {
    try {

        const response = await axios.get(`${Urls.Users}/account`, {
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

export const patchAccount = createAsyncThunk('patchAccount', async (formData: FormData, thunkApi) => {
    try {
        const response = await axios.patch(`${Urls.Users}/account`, formData, {
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