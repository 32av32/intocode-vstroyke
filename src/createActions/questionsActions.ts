import { createAsyncThunk } from "@reduxjs/toolkit"
import { IQuestions } from "../types/questionsTypes"
import axios from "axios"

export const getQuestions = createAsyncThunk('questions/getQuestions', async (data: string, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:4000/questions/${data}`)
        const question = await res.json()
        return thunkApi.fulfillWithValue(question)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const addQuestion = createAsyncThunk('questions/addQuestion', async ({questionText, ad}: {questionText: string, ad: string}, thunkApi) => {
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

export const patchQuestion = createAsyncThunk('questions/patchQuestion', async ({id, answer}:{id: string, answer: string}, thunkApi) => {
    try {
        const res = await axios.patch(`http://localhost:4000/questions/${id}`, {answer}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})