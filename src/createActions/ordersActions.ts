import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Urls} from "../utils/urls";

export const postOrder = createAsyncThunk('orders/postOrder', async (adId: string, thunkApi) => {
    try {
        const response = await axios.post(Urls.Orders, {
            ad: adId
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при добавлении заказа')
    }
})

export const getOrder = createAsyncThunk('orders/getOrder', async (adId: string, thunkApi) => {
    try {
        const response = await axios.get(`${Urls.Orders}/${adId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при получении заказа')
    }
})

export const getUserOrders = createAsyncThunk('orders/getOrders', async (_, thunkApi) => {
    try {
        const response = await axios.get(Urls.Orders, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при получении заказа')
    }
})

export const getAdOrders = createAsyncThunk('orders/getAdOrders', async (adId: string, thunkApi) => {
    try {
        const response = await axios.get(`${Urls.Orders}/by_ad/${adId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при получении заказа')
    }
})

export const deleteOrders = createAsyncThunk('orders/deleteOrders', async (id: string, thunkApi) => {
    try {
        const response = await axios.delete(`${Urls.Orders}/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch (e) {
        return thunkApi.rejectWithValue('Ошибка при получении заказа')
    }
})

export const patchOrders = createAsyncThunk('orders/patchOrders', async ({id, status}: {id: string, status: string}, thunkApi) => {
    try {
        const response = await axios.patch(`${Urls.Orders}/${id}`, {status}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch (e) {
        return thunkApi.rejectWithValue('Ошибка при получении заказа')
    }
})