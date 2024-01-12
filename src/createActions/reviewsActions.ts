import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Urls} from "../utils/urls";

export const postReview = createAsyncThunk('postReview', async (data: {ad: string, text: string, rating: number, qualityMark: string, speedMark: string}, thunkApi) => {
    try {
        const response = await axios.post(Urls.Reviews, data, {
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

export const getReviews = createAsyncThunk('getReviews', async (adId: string, thunkApi) => {
    try {
        const response = await axios.get(`${Urls.Reviews}/${adId}`)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при добавлении объявления')
    }
})