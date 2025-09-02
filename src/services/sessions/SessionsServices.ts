import { Alert } from "react-native";
import { Api } from "../../utils/Api";
import { IPayloadSave, IRequestPayload } from "./types";




const login = async (payload: Pick<IRequestPayload, 'email' | 'password'>): Promise<IPayloadSave> => {

    try {
        const { data } = await Api.post('/session/login', payload);
        
        return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token
        };
        
    } catch (error: any) {
        Alert.alert("Erro!", "Erro no servidor, tente mais tarde." )
        throw new Error(error.response.data.message)
    }

}


export const SessionServices = {
    login,
}