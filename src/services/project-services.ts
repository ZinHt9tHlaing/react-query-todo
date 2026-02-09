import type { Project } from "../types/projectTypes";
import { apiInstance } from "../api/client";

export const getProjects = async (page = 1) => {
  const res = await apiInstance.get<Project[]>(
    `/projects?_page=${page}_limit=3`,
  );

  return res.data;
};
