import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAd, IAdDetail} from "../types/adsTypes";
import {deleteAd, getAdById, getUserAds, postAd} from "../createActions/adsActions";
import {deleteFavorite, postFavorite} from "../createActions/favoritesActions";

interface IInitialState {
    ads: IAd[]
    detailAd: IAdDetail
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    ads: [],
    detailAd: {
        _id: '',
        title: '',
        category: '',
        description: '',
        user: {
            _id: '',
            email: '',
            organization: '',
            name: '',
            image: '',
            phone: '',
            createdDate: '',
        },
        images: [''],
        address: '',
        price: 0,
        unit: '',
        rating: 0,
    },
    loading: false,
    errors: null,
}

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postAd.fulfilled, (state, action: PayloadAction<IAd>) => {
            state.loading = false
            state.errors = null
            state.ads.push(action.payload)
        })
            .addCase(postAd.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(postAd.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(getUserAds.fulfilled, (state, action: PayloadAction<IAd[]>) => {
                state.loading = false
                state.errors = null
                state.ads = action.payload
            })
            .addCase(getUserAds.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getUserAds.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(getAdById.fulfilled, (state, action: PayloadAction<IAdDetail>) => {
                state.loading = false
                state.errors = null
                state.detailAd = action.payload
            })
            .addCase(getAdById.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getAdById.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(deleteAd.fulfilled, (state, action: PayloadAction<string, string, { arg: string }>) => {
                state.loading = false
                state.errors = null
                state.ads = state.ads.filter(ad => ad._id !== action.meta.arg)
            })
            .addCase(deleteAd.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(deleteAd.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(postFavorite.fulfilled, (state, action: PayloadAction<IAdDetail>) => {
                state.loading = false
                state.errors = null
                state.detailAd.favorite = action.payload.favorite
            })
            .addCase(postFavorite.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(postFavorite.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(deleteFavorite.fulfilled, (state, action: PayloadAction<IAdDetail>) => {
                state.loading = false
                state.errors = null
                state.detailAd.favorite = undefined
            })
            .addCase(deleteFavorite.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(deleteFavorite.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
    }
})

export default adsSlice.reducer