import { useSession } from "next-auth/react";
import { useQuery, QueryFunctionContext } from "react-query";

export const useFetchData = ({
  endpoint,
  method = "GET",
  headers = {},
  body = null,
}) => {
  const { data: session, status } = useSession();
  const fetchDataRequest = async ({ queryKey }) => {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: method !== "GET" && body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return response.json();
  };

  const { data, isLoading, error, refetch } = useQuery(
    [endpoint, method, headers, body],
    fetchDataRequest,
    { enabled: status === "authenticated" }
  );

  return { data, isLoading, error, refetch };
};
