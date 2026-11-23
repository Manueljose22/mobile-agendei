import { Api } from "../../utils/Api";
import { IDoctorsSave, IDoctorsService } from "./types";

export const DoctorsServices = {
  async getAll(): Promise<IDoctorsSave[]> {
    try {
      const { data } = await Api.get<IDoctorsSave[]>("/doctors");
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? "Não foi possível carregar os médicos.");
    }
  },

  async getDoctorById(idDoctor: string): Promise<IDoctorsSave> {
    try {
      const { data } = await Api.get<IDoctorsSave>(`/doctors/${idDoctor}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? "Não foi possível carregar os dados do médico.");
    }
  },

  async getDoctorService(idDoctor: string): Promise<IDoctorsService[]> {
    try {
      const { data } = await Api.get<IDoctorsService[]>(`/doctor/${idDoctor}/service`);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? "Não foi possível carregar os serviços do médico.");
    }
  },
};
