import { Api } from "@/src/utils/Api";
import { ISpecilitySaved } from "./types";

export const SpecialitysServices = {
  async getAll(): Promise<ISpecilitySaved[]> {
    try {
      const { data } = await Api.get<ISpecilitySaved[]>("/specialty/");
      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? "Erro ao carregar as especialidades."
      );
    }
  },
};
