import { Api } from '../../utils/Api';
import { IAppointmentSave, ICreateAppointments } from './types';

const getSafeErrorMessage = (error: any, fallback: string) => {
    const message = error?.response?.data?.message;
    if (typeof message === "string" && message.trim() && !message.includes("/appointments/")) {
        return message;
    }
    return fallback;
};

export const AppointmentServices = {
    async Create(data: ICreateAppointments): Promise<void> {
        try {
            await Api.post("/appointments/", data);
        } catch (error: any) {
            throw new Error(getSafeErrorMessage(error, "Não foi possível criar a marcação."));
        }
    },

    async GetAll(): Promise<IAppointmentSave[]> {
        try {
            const { data } = await Api.get<IAppointmentSave[]>("/appointments/all");
            return data;
        } catch (error: any) {
            throw new Error(getSafeErrorMessage(error, "Não foi possível carregar os agendamentos."));
        }
    },

    async Reschedule(idAppointment: string, data: { bookingDate: string; bookingHour: string }): Promise<void> {
        try {
            await Api.patch(`/appointments/${idAppointment}`, data);
        } catch (error: any) {
            throw new Error(getSafeErrorMessage(error, "Não foi possível reagendar. A alteração deve seguir o fluxo de proposta de reagendamento."));
        }
    },

    async Cancel(id: string): Promise<void> {
        try {
            await Api.patch(`/appointments/cancel/${id}`);
        } catch (error: any) {
            throw new Error(getSafeErrorMessage(error, "Não foi possível cancelar o agendamento. Verifica a ligação e tenta novamente."));
        }
    }
};
