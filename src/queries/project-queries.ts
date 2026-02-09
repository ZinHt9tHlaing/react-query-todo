import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/project-api";

export const useProject = (page: number) => {
  return useQuery({
    queryKey: ["project", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
};
