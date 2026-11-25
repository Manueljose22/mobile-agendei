import { Api } from "../../utils/Api";
import { IDoctorAvailabilityResponse } from "./availabilityTypes";

export const AvailabilityServices = {
  async getDoctorAvailability(doctorId: string, from: string, to: string): Promise<IDoctorAvailabilityResponse> {
    try {
      const { data } = await Api.get<IDoctorAvailabilityResponse>(`/doctors/${doctorId}/availability`, { params: { from, to } });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? "Não foi possível carregar a disponibilidade do médico.");
    }
  },
};
