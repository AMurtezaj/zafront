export interface ProjectDetailsImgVid {
    id: string;
    location: string;
    year: string;
    status: string;
    video?: string
    projectId: string;
    project?: string
    images: {
        $values: string[];
      };
}