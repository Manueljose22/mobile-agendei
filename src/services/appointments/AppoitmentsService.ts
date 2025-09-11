import { Api } from '../../utils/Api';
import { IAppointmentSave, ICreateAppointments } from './types';




export const AppointmentServices = {

    async Create(data: ICreateAppointments): Promise<void | Error> {

        try {
            await Api.post<ICreateAppointments>("/appointments/", data);
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    },

    async GetAll(): Promise<IAppointmentSave[]> {

        try {
            const { data } = await Api.get<IAppointmentSave[]>("/appointments/all");
            return data

        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    },

    async Reschedule(idAppointment: string, data:{bookingDate: Date, bookingHour: string}): Promise<void> {
        try {
            await Api.put(`/appointments/${idAppointment}`, data);

        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    },
    async Cancel(idAppointment: string): Promise<void> {
        try {
            await Api.put(`/appointments/${idAppointment}`);

        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    }





}