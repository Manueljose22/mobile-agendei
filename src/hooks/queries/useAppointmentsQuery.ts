import { useQuery } from "@tanstack/react-query";
import { AppointmentServices } from "@/src/services/appointments/AppoitmentsService";
import { queryKeys } from "@/src/services/queries/queryKeys";

export function useAppointmentsQuery() {
  return useQuery({
    queryKey: queryKeys.appointments.all,
    queryFn: AppointmentServices.GetAll,
    staleTime: 60 * 1000,
  });
}
