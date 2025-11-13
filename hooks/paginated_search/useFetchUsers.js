import { API_END_POINTS } from "@/config/endPoints";
import { useEffect, useState } from "react";
import { useFetchData } from "../useFetchData";

export const useFetchUsers = (searchState) => {
  const [params, setParams] = useState(new URLSearchParams());
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchState.page > 0) {
      newParams.set("page", searchState.page.toString());
    } else {
      newParams.delete("page");
    }
    if (searchState?.phone) {
      newParams.set("phone", searchState.phone);
    } else {
      newParams.delete("phone");
    }
    if (searchState?.email) {
      newParams.set("email", searchState.email);
    } else {
      newParams.delete("email");
    }
    setParams(newParams);
  }, [searchState]);

  const { data, isLoading, refetch } = useFetchData({
    endpoint:
      params.size > 0
        ? API_END_POINTS.getAllPaginatedUser + "?" + params.toString()
        : API_END_POINTS.getAllPaginatedUser,
  });

  return { data, isLoading, refetch };
};
