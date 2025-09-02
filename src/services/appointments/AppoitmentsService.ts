import { Alert } from 'react-native';
import { Api } from '../../utils/Api';
import { IAppointmentSave, ICreateAppointments } from './types';





export const AppointmentServices = {

    async Create(data: ICreateAppointments): Promise<void | Error> {

        try {
            await Api.post<ICreateAppointments>("/appointments/", data);
        } catch (error: any) {
            Alert.alert("Alerta!", error.response.data.message);
            throw new Error(error.response.data.message);
        }
    },

    async GetAll(): Promise<IAppointmentSave[]> {

        try {
            const { data } = await Api.get<IAppointmentSave[]>("/appointments/all");
            return data

        } catch (error: any) {
            Alert.alert("Alerta", error.response.data.message);
            throw new Error(error.response.data.message);
        }
    },

    async Cancel(idAppointment: string): Promise<void> {
        try {
            await Api.delete(`/appointments/${idAppointment}`);

        } catch (error: any) {
            Alert.alert("Erro.", error.response.data.message);
            throw new Error(error.response.data.message);
        }
    }





}