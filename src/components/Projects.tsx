import { useState } from "react";
import { useProject } from "../queries/project-queries";

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProject(page);

  return (
    <div>
      {isPending ? (
        <p>Loading</p>
      ) : isError ? (
        <p style={{ color: "red" }}>Error : {error.message}</p>
      ) : (
        <p>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </p>
      )}
      <span>Current Page: {page} </span>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      {isFetching ? <span>Loading...</span> : null}{" "}
    </div>
  );
};

export default Projects;
