export interface IOrder {
    ad: string
    user: string
    createdDate: string
    status: 'pending' | 'processing' | 'fulfilled' | 'rejected' | undefined
}

export const orderStatusMap = {
    'pending': 'В ожидании',
    'processing': 'В работе',
    'fulfilled': 'Завершен',
    'rejected': 'Отклонен',
}