import {createAsyncThunk} from "@reduxjs/toolkit";

import axios from "axios";
import {Urls} from "../utils/urls";

export const getAds = createAsyncThunk('getAds', async (query: string, thunkApi) => {
    try {
        const response = await axios.get(`${Urls.Ads}?${query}`)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при при получении объявлении')
    }
})

export const postAd = createAsyncThunk('postAd', async (form: FormData, thunkApi) => {
    try {
        const response = await axios.post(Urls.Ads, form, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при добавлении объявления')
    }
})

export const patchAd = createAsyncThunk('patchAd', async ({_id, data}: {_id: string, data: any}, thunkApi) => {
    try {
        const response = await axios.patch(`${Urls.Ads}/${_id}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при добавлении объявления')
    }
})

export const getAdById = createAsyncThunk('getAdById', async (adId: string, thunkApi) => {
    try {
        const token = localStorage.getItem('token')
        let response
        if (token) {
            response = await axios.get(`${Urls.Ads}/${adId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } else {
            response = await axios.get(`${Urls.Ads}/${adId}`)
        }
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при при получении объявлении')
    }
})

export const getUserAds = createAsyncThunk('getUserAds', async (userId: string, thunkApi) => {
    try {
        const response = await axios.get(`${Urls.Ads}/${userId}/ads`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при при получении объявлений пользователя')
    }
})

export const deleteAd = createAsyncThunk('deleteAd', async (adId: string, thunkApi) => {
    try {
        const response = await axios.delete(`${Urls.Ads}/${adId}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при при получении удалении объявления')
    }
})