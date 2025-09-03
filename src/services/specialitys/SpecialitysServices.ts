import { Api } from "@/src/utils/Api";
import { ISpecilitySaved } from "./types";






export const SpecialitysServices = {

    async getAll(): Promise<ISpecilitySaved[]> {
        try {
            const { data } = await Api.get<ISpecilitySaved[]>("/speciality/");
            return data;
        } catch (error: any) {
            throw new Error("Erro ao carregar especialidade: ", error.response.message)
        }

    }
}