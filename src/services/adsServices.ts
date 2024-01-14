import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IAd} from "../types/adsTypes";


export const adsApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
    tagTypes: ['Ads'],
    endpoints: (builder) => ({
        getAds: builder.query<IAd[], null>({
            query: () => 'ads',
        }),
        getAdById: builder.query<IAd, string>({
            query: (adId) => `ads/${adId}`,
        }),
        postAd: builder.mutation<IAd, FormData>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data) => ({
                url: 'ads',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Ads'}],
        }),
    }),
})

export const { useGetAdsQuery, useGetAdByIdQuery, usePostAdMutation } = adsApi