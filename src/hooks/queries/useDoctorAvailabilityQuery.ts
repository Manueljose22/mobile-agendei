import { useQuery } from "@tanstack/react-query";
import { AvailabilityServices } from "@/src/services/doctors/AvailabilityServices";
import { queryKeys } from "@/src/services/queries/queryKeys";

export function useDoctorAvailabilityQuery(doctorId: string, from: string, to: string) {
  return useQuery({
    queryKey: queryKeys.doctors.availability(doctorId, from, to),
    queryFn: () => AvailabilityServices.getDoctorAvailability(doctorId, from, to),
    enabled: Boolean(doctorId && from && to),
    staleTime: 2 * 60 * 1000,
  });
}
