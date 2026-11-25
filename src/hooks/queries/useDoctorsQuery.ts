import { useQuery } from "@tanstack/react-query";
import { DoctorsServices } from "@/src/services/doctors/DoctorsServices";
import { queryKeys } from "@/src/services/queries/queryKeys";

export function useDoctorsQuery() {
  return useQuery({
    queryKey: queryKeys.doctors.all,
    queryFn: DoctorsServices.getAll,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDoctorQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.doctors.detail(id),
    queryFn: () => DoctorsServices.getDoctorById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDoctorServicesQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.doctors.services(id),
    queryFn: () => DoctorsServices.getDoctorService(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
