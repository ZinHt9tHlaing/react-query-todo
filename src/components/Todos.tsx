import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTodo, useUpdateTodo } from "../mutations/todo-mutations";
import { useTodoIds, useTodos } from "../queries/todo-queries";
import type { Todo } from "../types/todoTypes";

const Todos = () => {
  const { data: todoIds, isLoading, isError } = useTodoIds();
  const todoQueries = useTodos(todoIds);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

  const { register, handleSubmit, reset } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
    reset();
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>There is an error!</span>;

  return (
    <>
      {/* <p>Query Function status: {fetchStatus}</p>
      <p>Query data status: {status}</p>
      <p>Global isFetching: {isFetching}</p> */}

      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New todo:</h4>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          {...register("description")}
          required
        />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
        />
      </form>

      <ul>
        {todoQueries.map(({ data }, index) => (
          <li key={index}>
            <div>Id: {data?.id}</div>
            <span>
              Title: <strong>{data?.title}</strong> <br />
              Description: <strong>{data?.description}</strong>
            </span>
            <div>
              <button
                disabled={updateTodoMutation.isPending}
                onClick={() => handleMarkAsDoneSubmit(data)}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
