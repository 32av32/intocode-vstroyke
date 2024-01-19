import { IAd } from "./adsTypes"

export interface IQuestions {
    _id: string
    questionText: string
    user: {
        id: string
        name: string
    }
    ad: string
    createdDate: string
}