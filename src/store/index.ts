import { configureStore } from '@reduxjs/toolkit'
import {adsApi} from "../services/adsServices";
import authSlice from "../slices/authSlice";
import adsSlice from "../slices/adsSlice";
import commonSlice from "../slices/commonSlice";
import userSlice from "../slices/userSlice";
import reviewsSlice from "../slices/reviewsSlice";
import questionsSlice from '../slices/questionsSlice';

const store = configureStore({
    reducer: {
        questions: questionsSlice,
        auth: authSlice,
        ads: adsSlice,
        common: commonSlice,
        user: userSlice,
        reviews: reviewsSlice,
        [adsApi.reducerPath]: adsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(adsApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch