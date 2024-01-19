import { createSlice } from "@reduxjs/toolkit"
import { addQuestions, getQuestions } from "../createActions/questionsActions"
import { IQuestions } from "../types/questionTypes"



interface IInitialState {
    questions: IQuestions[]
    loading: boolean
}

const initialState: IInitialState = {
    questions: [{
        _id: '',
        questionText: '',
        user: {
            id: '',
            name: '',
        },
        ad: '',
        createdDate: '',
    }],
    // questions: [],
    loading: false
}



const questionsSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.questions = action.payload
            })

                .addCase(addQuestions.fulfilled, (state, action) => {
                    state.questions.push(action.payload)
                })
    }
})

export default questionsSlice.reducer