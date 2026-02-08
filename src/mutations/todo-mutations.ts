import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todoTypes";
import { createTodo } from "../api/todo-api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),

    onMutate: () => {
      console.log("Mutate");
    },

    onError: () => {
      console.log("Error");
    },

    onSuccess: () => {
      console.log("Success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
