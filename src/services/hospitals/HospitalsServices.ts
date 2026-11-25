import { Api } from "@/src/utils/Api";
import { IHospital } from "./types";

export const HospitalsServices = {
  async getAll(): Promise<IHospital[]> {
    try {
      const { data } = await Api.get<IHospital[]>("/hospitals/");
      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? "Não foi possível carregar os hospitais."
      );
    }
  },

  async getById(id: string): Promise<IHospital> {
    try {
      const { data } = await Api.get<IHospital>(`/hospitals/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? "Não foi possível carregar os dados do hospital."
      );
    }
  },
};
