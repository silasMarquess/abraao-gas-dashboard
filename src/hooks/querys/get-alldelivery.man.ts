import { getAllDeliverys } from "@/actions/get-alldeliverys";
import { useQuery } from "@tanstack/react-query";

export const getCreatedDeliverysKey = () => ["getAllDelivery"] as const;

export const GetAllDeliveryQuery = () => {
  return useQuery({
    queryKey: getCreatedDeliverysKey(),
    queryFn: () => getAllDeliverys(),
  });
};
