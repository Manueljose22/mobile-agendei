import axios from "axios";
import { Api } from "../../utils/Api";
import { IPayloadSave, IRequestPayload } from "./types";

const login = async (
  payload: Pick<IRequestPayload, "email" | "password">
): Promise<IPayloadSave> => {
  try {
    const { data } = await Api.post("/session/login", payload);

    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      token: data.token,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(
        typeof message === "string"
          ? message
          : "Não foi possível ligar ao servidor. Verifique a sua ligação."
      );
    }

    throw error instanceof Error
      ? error
      : new Error("Ocorreu um erro inesperado ao iniciar sessão.");
  }
};

export const SessionServices = {
  login,
};
