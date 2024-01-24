import { createSlice } from "@reduxjs/toolkit";
import { IQuestions } from "../types/questionsTypes";
import { addQuestions, getQuestions } from "../createActions/questionsActions";

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

      .addCase(addQuestions.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      });
  },
});

export default questionsSlice.reducer;
