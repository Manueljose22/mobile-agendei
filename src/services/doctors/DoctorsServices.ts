import { Api } from "../../utils/Api";
import { IDoctorsSave, IDoctorsService } from "./types";





export const DoctorsServices = {

    async getAll(): Promise<IDoctorsSave[]> {

        try {

            const { data } = await Api.get<IDoctorsSave[]>("/doctors");

            return data;

        } catch (error: any) {
            // Alert.alert(error.response.data.message);
            throw new Error(error.response.data.message);
        }
    },



    async getDoctorById(idDoctor: string): Promise<IDoctorsSave> {

        try {
            const { data } = await Api.get<IDoctorsSave>(`/doctors/${idDoctor}`)
            return data;

        } catch (error: any) {
            // Alert.alert(error.response.data.message);
            throw new Error(error.response.data.message);
        }
    },

    async getDoctorService(idDoctor: string): Promise<IDoctorsService[]> {

        try {
            const { data } = await Api.get<IDoctorsService[]>(`/doctors/${idDoctor}/services`)

            return data;

        } catch (error: any) {
            // Alert.alert(error.response.data.message);
            throw new Error(error.response.data.message);
        }
    }



}
