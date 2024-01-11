import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Urls} from "../utils/urls";

export const getCategories = createAsyncThunk('getCategories', async (_, thunkApi) => {
    try {
        const response = await axios.get(Urls.Categories)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }
        return response.data
    } catch(e) {
        return thunkApi.rejectWithValue('Ошибка при получении категорий')
    }
})