export interface IReview {
    _id: string
    text: string
    user: {
        name: string
        image: string
    }
    ad: string
    rating: number
    qualityMark: string
    speedMark: string
    createdDate: string
}