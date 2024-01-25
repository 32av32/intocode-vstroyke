import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuestions} from "../types/questionsTypes";
import {addQuestion, getQuestions, patchQuestion} from "../createActions/questionsActions";

interface IInitialState {
    questions: IQuestions[];
    loading: boolean;
}

const initialState: IInitialState = {
    questions: [
        {
            _id: "",
            questionText: "",
            user: {
                id: "",
                name: "",
            },
            ad: "",
            createdDate: "",
        },
    ],
    loading: false,
};

const questionsSlice = createSlice({
    name: "question",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                state.questions.push(action.payload);
            })
            .addCase(patchQuestion.fulfilled, (state, action: PayloadAction<IQuestions>) => {
                state.questions = state.questions.map(item => {
                  if (item._id === action.payload._id) {
                    return action.payload
                  }
                  return item
                })
            });
    },
});

export default questionsSlice.reducer;
