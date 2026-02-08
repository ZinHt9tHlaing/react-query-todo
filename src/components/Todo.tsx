import { useTodoIds } from "../queries/todo-queries";

const Todo = () => {
  const { data: todoIds, isLoading, isError } = useTodoIds();

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>There is an error!</span>;

  return (
    <div>
      {/* <p>Query Function status: {fetchStatus}</p>
      <p>Query data status: {status}</p>
      <p>Global isFetching: {isFetching}</p> */}
          
      {todoIds?.map((id) => (
        <p key={id}>id : {id}</p>
      ))}
    </div>
  );
};

export default Todo;
