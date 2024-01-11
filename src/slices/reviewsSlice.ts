import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getReviews, postReview} from "../createActions/reviewsActions";
import {IReview} from "../types/reviewTypes";

interface IInitialState {
    reviews: IReview[]
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    reviews: [{
        _id: '',
        text: '',
        user: {
            name: '',
            image: '',
        },
        ad: '',
        rating: 0,
        qualityMark: '',
        speedMark: '',
        createdDate: '',
    }],
    loading: false,
    errors: null,
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postReview.fulfilled, (state, action: PayloadAction<IReview>) => {
            state.loading = false
            state.errors = null
            state.reviews.push(action.payload)
        })
            .addCase(postReview.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(postReview.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(getReviews.fulfilled, (state, action: PayloadAction<IReview[]>) => {
                state.loading = false
                state.errors = null
                state.reviews = action.payload
            })
            .addCase(getReviews.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
    }
})

export default reviewsSlice.reducer