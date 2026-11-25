import { useQuery } from "@tanstack/react-query";
import { SpecialitysServices } from "@/src/services/specialitys/SpecialitysServices";
import { queryKeys } from "@/src/services/queries/queryKeys";

export function useSpecialitiesQuery() {
  return useQuery({
    queryKey: queryKeys.specialities.all,
    queryFn: SpecialitysServices.getAll,
    staleTime: 10 * 60 * 1000,
  });
}
