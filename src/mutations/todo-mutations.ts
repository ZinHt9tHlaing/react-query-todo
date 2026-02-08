import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todoTypes";
import { createTodo, deleteTodo, updateTodo } from "../api/todo-api";

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

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSettled: async (_, error, variables) => {
      console.log("update settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (id: number) => deleteTodo(id),
      
      onSuccess: () => {
        console.log("deleted successfully");
      },

    onSettled: async (_, error) => {
      console.log("delete settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
