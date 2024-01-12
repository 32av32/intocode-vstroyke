import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Urls} from "../utils/urls";

export const postFavorite = createAsyncThunk('postFavorite', async (adId: string, thunkApi) => {
    try {
        const response = await axios.post(Urls.Favorites, {ad: adId}, {
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

export const deleteFavorite = createAsyncThunk('deleteFavorite', async (favoriteId: string, thunkApi) => {
    try {
        const response = await axios.delete(`${Urls.Favorites}/${favoriteId}`,{
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

export const getUserFavorites = createAsyncThunk('getUserFavorites', async (_, thunkApi) => {
    try {
        const response = await axios.get(Urls.Favorites, {
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
