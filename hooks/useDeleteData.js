import { useSession } from "next-auth/react";
import { useMutation } from "react-query";

export const useDeleteData = ({
  endpoint,
  method = "DELETE",
  headers = {},
  body = null,
}) => {
  const { data: session, status } = useSession();
  const createMyDeleteRequest = async (id) => {
    const response = await fetch(`${endpoint}${id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: null,
    });

    if (!response.ok) {
      throw new Error("Failed to create data");
    }

    return response.json();
  };

  const deleteMutation = useMutation(({ id }) => {
    return createMyDeleteRequest(id);
  });

  const deleteDataById = async (id) => {
    try {
      const response = await deleteMutation.mutateAsync({ id });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    deleteDataById,
    ...deleteMutation,
  };
};
