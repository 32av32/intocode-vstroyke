import {IUser} from "./userType";

export interface IAuth {
    user: IUser
    token: string
}