import { Api } from '../../utils/Api';
import { IAppointmentSave, ICreateAppointments } from './types';

export const AppointmentServices = {
    async Create(data: ICreateAppointments): Promise<void> {
        try {
            await Api.post("/appointments/", data);
        } catch (error: any) {
            const message = error.response?.data?.message ?? error.message ?? "Não foi possível criar a marcação.";
            throw new Error(typeof message === "string" ? message : "Não foi possível criar a marcação.");
        }
    },

    async GetAll(): Promise<IAppointmentSave[]> {
        try {
            const { data } = await Api.get<IAppointmentSave[]>("/appointments/all");
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message ?? "Não foi possível carregar os agendamentos.");
        }
    },

    async Reschedule(idAppointment: string, data: { bookingDate: string; bookingHour: string }): Promise<void> {
        try {
            await Api.patch(`/appointments/${idAppointment}`, data);
        } catch (error: any) {
            throw new Error(error.response?.data?.message ?? "Não foi possível reagendar.");
        }
    },

    async Cancel(id: string): Promise<void> {
        try {
            await Api.patch(`/appointments/cancel/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message ?? "Não foi possível cancelar.");
        }
    }
};