import { useQuery } from "@tanstack/react-query";
import { HospitalsServices } from "@/src/services/hospitals/HospitalsServices";
import { queryKeys } from "@/src/services/queries/queryKeys";

export function useHospitalsQuery() {
  return useQuery({
    queryKey: queryKeys.hospitals.all,
    queryFn: HospitalsServices.getAll,
    staleTime: 10 * 60 * 1000,
  });
}

export function useHospitalQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.hospitals.detail(id),
    queryFn: () => HospitalsServices.getById(id),
    enabled: Boolean(id),
    staleTime: 10 * 60 * 1000,
  });
}
