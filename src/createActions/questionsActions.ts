import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Urls } from "../utils/urls"

export const getQuestions = createAsyncThunk('questions/getQuestions', async (adId: string, thunkApi) => {
    try {
        const response = await axios.get(`${Urls.Questions}/${adId}`)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data.error)
        }       
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const addQuestions = createAsyncThunk('questions/add', async (data: string, thunkApi) => {
    try {
        const res = await fetch('http://localhost:4000/question', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                questionText: data,
            })
        })
        const question = await res.json()
        return thunkApi.fulfillWithValue(question)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})