import { useSession } from "next-auth/react";
import { useMutation } from "react-query";

export const usePutData = ({
  endpoint,
  method = "PUT",
  headers = {},
  body = null,
}) => {
  const { data: session, status } = useSession();
  const createMyPutRequest = async (id, body, formData) => {
    const requestBody = formData ? body : JSON.stringify(body);
    const requestHeaders = {
      Authorization: `Bearer ${session?.user?.token}`,
      ...headers,
    };

    if (!formData) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(`${endpoint}${id}`, {
      method,
      headers: requestHeaders,
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("Failed to create data");
    }

    return response.json();
  };

  const putMutation = useMutation(({ id, body, formData }) => {
    return createMyPutRequest(id, body, formData);
  });

  const putDataById = async (id, body, formData) => {
    try {
      const response = await putMutation.mutateAsync({ id, body, formData });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    putDataById,
    ...putMutation,
  };
};
