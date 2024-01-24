import { createAsyncThunk } from "@reduxjs/toolkit"
import { IQuestions } from "../types/questionsTypes"
// import axios from "axios"
// import { Urls } from "../utils/urls"

// export const getQuestions = createAsyncThunk('questions/getQuestions', async (adId: string, thunkApi) => {
//     try {
//         console.log('getques');
        
//         const response = await axios.get(`${Urls.Questions}/${adId}`)
//         if (response.status !== 200) {
//             return thunkApi.rejectWithValue(response.data.error)
//         }       
//         return response.data
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })

export const getQuestions = createAsyncThunk('questions/getQuestions', async (data: string, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:4000/questions/${data}`)
        const question = await res.json()
        return thunkApi.fulfillWithValue(question)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const addQuestions = createAsyncThunk('questions/add', async ({questionText, ad}: {questionText: string, ad: string}, thunkApi) => {
    try {
        const res = await fetch('http://localhost:4000/questions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({questionText, ad})
        })
        const question = await res.json()
        return thunkApi.fulfillWithValue(question)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})