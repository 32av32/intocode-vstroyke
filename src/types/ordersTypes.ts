import {IAd} from "./adsTypes";
import {IUser} from "./userType";


export type IOrderUser = Pick<IUser, '_id' | 'email' | 'name' | 'image'>
export interface IOrder {
    _id: string
    ad: IAd | string
    user: IOrderUser | string
    createdDate: string
    status: 'pending' | 'processing' | 'fulfilled' | 'rejected' | null
}

export const orderStatusMap = {
    'pending': 'В ожидании',
    'processing': 'В работе',
    'fulfilled': 'Завершен',
    'rejected': 'Отклонен',
    'canceled': 'Прекращен',
}