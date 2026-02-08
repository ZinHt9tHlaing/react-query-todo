import { useQuery } from "@tanstack/react-query";
import { getTodosIds } from "../api/todo-api";

export const useTodoIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
};
