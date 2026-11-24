import { isAxiosError } from "axios";
import { Api } from "../../utils/Api";
import { IPayloadSave, IRequestPayload } from "../sessions/types";
import { IUserProfile } from "./types";

export const PatientsServices = {
  async Register(payload: IRequestPayload): Promise<IPayloadSave> {
    try {
      const { data } = await Api.post("/patients/", payload);

      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      };
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        throw new Error(
          typeof message === "string"
            ? message
            : "Não foi possível ligar ao servidor. Verifique a sua ligação."
        );
      }

      throw error instanceof Error
        ? error
        : new Error("Ocorreu um erro inesperado ao criar a conta.");
    }
  },

  async Profile(): Promise<IUserProfile> {
    try {
      const { data } = await Api.get<IUserProfile>("/patients/profile");
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        throw new Error(
          typeof message === "string"
            ? message
            : "Não foi possível carregar o perfil."
        );
      }
      throw error instanceof Error ? error : new Error("Erro ao carregar o perfil.");
    }
  },

  async updateProfile(id: string, data: Partial<IUserProfile> | FormData): Promise<void> {
    try {
      await Api.patch(`/patients/${id}`, data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const responseMessage = error.response?.data?.message;
        const message = typeof responseMessage === "string"
          ? responseMessage
          : error.response
            ? "O servidor recusou a actualização."
            : "Não foi possível obter resposta do servidor. Verifique a ligação e o endereço da API.";
        const status = error.response?.status;
        const code = error.code;

        throw new Error([
          message,
          status ? `HTTP ${status}` : null,
          !status && code ? `Código: ${code}` : null,
        ].filter(Boolean).join(" — "));
      }
      throw error instanceof Error ? error : new Error("Erro inesperado ao actualizar o perfil.");
    }
  },

  async DeleteAccount(id: string): Promise<void> {
    try {
      await Api.delete(`/patients/${id}`);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        throw new Error(
          typeof message === "string" ? message : "Não foi possível eliminar a conta."
        );
      }
      throw error instanceof Error ? error : new Error("Erro ao eliminar a conta.");
    }
  },
};
