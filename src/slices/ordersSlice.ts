import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "../types/ordersTypes";
import {
    deleteOrders,
    getAdOrders,
    getOrder,
    getUserOrders,
    patchOrders,
    postOrder
} from "../createActions/ordersActions";

interface IInitialState {
    orders: IOrder[]
    order: IOrder | null
    loading: boolean
    errors: string | null
}

const initialState: IInitialState = {
    orders: [],
    order: {
        _id: '',
        ad: '',
        user: '',
        createdDate: '',
        status: null,
    },
    loading: false,
    errors: null,
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
            state.loading = false
            state.errors = null
            state.orders.push(action.payload)
            state.order = action.payload
        })
            .addCase(postOrder.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(getOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
                state.loading = false
                state.errors = null
                state.order = action.payload
            })
            .addCase(getOrder.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(getUserOrders.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
                state.loading = false
                state.errors = null
                state.orders = action.payload
            })
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(getAdOrders.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
                state.loading = false
                state.errors = null
                state.orders = action.payload
            })
            .addCase(getAdOrders.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getAdOrders.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(deleteOrders.fulfilled, (state, action: PayloadAction<string, string, { arg: string }>) => {
                state.loading = false
                state.errors = null
                state.orders = state.orders.filter(order => order._id !== action.meta.arg)
            })
            .addCase(deleteOrders.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(deleteOrders.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
            .addCase(patchOrders.fulfilled, (state, action: PayloadAction<IOrder>) => {
                state.loading = false
                state.errors = null
                state.orders = state.orders.map(order => {
                    if (order._id === action.payload._id) {
                        order.status = action.payload.status
                        return order
                    }
                    return order
                })
            })
            .addCase(patchOrders.pending, (state) => {
                state.loading = true
                state.errors = null
            })
            .addCase(patchOrders.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload as string
            })
    }
})

export default ordersSlice.reducer