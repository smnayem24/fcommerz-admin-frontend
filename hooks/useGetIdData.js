import { useSession } from "next-auth/react";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";

export const useGetIdData = ({
  endpoint,
  method = "GET",
  headers = {},
  body = null,
}) => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const createMyGetIdRequest = async (id) => {
    const response = await fetch(`${endpoint}${id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: null,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  };

  const useGetByIdQuery = (id) => {
    return useQuery(["myData", id], () => createMyGetIdRequest(id), {
      enabled: false,
    });
  };

  const refetchDataById = async (id) => {
    return queryClient.fetchQuery(["myData", id], () =>
      createMyGetIdRequest(id)
    );
  };

  return {
    useGetByIdQuery,
    refetchDataById,
  };
};
