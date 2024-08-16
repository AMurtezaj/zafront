import { ProjectDetails } from "./ProjectDetails";

export interface ProjectUpdateDto{
    title: string;
    description: string;
    file?: File | null;
}