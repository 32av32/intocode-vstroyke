import {IUser} from "./userType";

export type IAdsUser = Omit<IUser, 'role'>
export interface IAd {
    _id: string
    title: string
    // description: string
    // user: string
    category: string
    images: [string]
    // address: string
    price: number
    unit: string
    rating: number
}

// export interface IUsersAd extends IAd{
//     category: string
// }

export interface IAdDetail {
    _id: string
    title: string
    description: string
    category: string
    images: [string]
    address: string
    price: number
    unit: string
    rating: number
    user: IAdsUser
}