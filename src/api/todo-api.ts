import type { Todo } from "../types/todoTypes";
import { apiInstance } from "./client";

export const getTodosIds = async () => {
  const res = await apiInstance.get<Todo[]>("/todos");

  return res.data.map((todo) => todo.id);
};
