import { useSession } from "next-auth/react";
import { useMutation } from "react-query";

export const usePostData = ({
  endpoint,
  method = "POST",
  headers = {},
  body = null,
}) => {
  const { data: session, status } = useSession();

  const createMyRequest = async (body, formData) => {
    const requestBody = formData ? body : JSON.stringify(body);

    const requestHeaders = {
      Authorization: `Bearer ${session?.user?.token}`,
      ...headers,
    };

    if (!formData) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(endpoint, {
      method,
      headers: requestHeaders,
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("Failed to create data");
    }

    return response.json();
  };

  const postMutation = useMutation(({ body, formData }) =>
    createMyRequest(body, formData)
  );

  const postData = async (body, formData) => {
    try {
      const response = await postMutation.mutateAsync({ body, formData });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    postData,
    ...postMutation,
  };
};
