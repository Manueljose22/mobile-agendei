import { Alert } from 'react-native';
import { Api } from '../../utils/Api';
import { IPayloadSave, IRequestPayload } from '../sessions/types';
import { IUserProfile } from './types';







export const PatientsServices = {
    
    async Register(payload: IRequestPayload): Promise<IPayloadSave> {

        try {
            const { data } = await Api.post("/patients/", payload);
            
            return {
                id: data.user,
                email: data.user.email,
                name: data.user.name,
                token: data.token
            }

        } catch (error: any) {
            Alert.alert("Erro", error.response.data.message)
            throw new Error(error.response.data.message);
        }
    },


    async Profile(): Promise<IUserProfile> {

        try {
            const { data } = await Api.get<IUserProfile>("/patients/profile");
            return data
        } catch (error: any) {
            Alert.alert("Erro", error.response.data.message)
            throw new Error(error.response.data.message);
        }

    },

    async updateProfile(data: IUserProfile): Promise<void> {

        try {
            await Api.put<IUserProfile>("/patients/:id", data);

        } catch (error: any) {
            Alert.alert("Erro", error.response.data.message)
            throw new Error(error.response.data.message);
        }

    },

    async DeleteAccount(id: string): Promise<void> {
        try {
            await Api.delete("/patients/:id");
            
        } catch (error: any) {
            Alert.alert("Erro", error.response.data.message)
            throw new Error(error.response.data.message);
        }

    }
}



