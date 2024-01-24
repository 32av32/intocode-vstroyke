import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../types/commonTypes";
import {getCategories} from "../createActions/commonActions";

interface IInitialState {
    categories: Category[]
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    categories: [],
    loading: false,
    errors: null,
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
            state.loading = false
            state.errors = null
            state.categories = action.payload
            state.categories.unshift({_id: '0', title: 'Все', description: 'Все'})
        })
            .addCase(getCategories.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
    }
})

export default commonSlice.reducer