


export type IUserProfile = {
    id: string;
    name: string;
    email: string;
    photo: string;
    phone: string;
    dateBirth: Date;
    address: string;
    gender: string;
}

export interface IPatientsave {
    user: IUserProfile;
    token: string
}