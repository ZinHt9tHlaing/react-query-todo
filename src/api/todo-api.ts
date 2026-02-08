import type { Todo } from "../types/todoTypes";
import { apiInstance } from "./client";

export const getTodosIds = async () => {
  const res = await apiInstance.get<Todo[]>("/todos");

  return res.data.map((todo) => todo.id);
};

export const getTodo = async (id: number) => {
  const res = await apiInstance.get<Todo>(`/todos/${id}`);
  return res.data;
};

export const createTodo = async (data: Todo) => {
  const res = await apiInstance.post<Todo>("/todos", data);
  return res.data;
};
