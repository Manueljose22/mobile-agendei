export interface ICreateAppointments {
    serviceId: string;
    doctorId: string;
    bookingDate: string;
    bookingHour: string;
}

export type IAppointmentSave = {
    id: string;
    service: string;
    doctor: string;
    specialty: string;
    patientname: string;
    price: number;
    status: string;
    hospitalname: string;
    booking_date: Date;
    booking_hour: string;
    idDoctor: string;
    idService: string;
    photo: string;
};