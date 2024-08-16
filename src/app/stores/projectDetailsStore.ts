// Import necessary dependencies
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Project } from '../models/Project';
import { ProjectDetails } from '../models/ProjectDetails';




export default class ProjectDetailsStore {
  projectDetailsList: ProjectDetails[] = [];
  selectedProjectDetails: ProjectDetails | undefined = undefined;
  projects: Project[] = [];
  loading = false;
  error: string | null = null;
  projectDetailsRegistry = new Map<string, ProjectDetails>();
  editMode = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get projectDetailsById() {
    return Array.from(this.projectDetailsRegistry.values()).sort((a, b) => Number(a.id) - Number(b.id));
  }

  convertProjectDetail = (data: any): ProjectDetails => ({
    ...data,
    images: data.images?.$values || []
  });
  

  loadProjectDetails = async () => {
    this.loadingInitial = true;
    try {
      const projectDetailsList = await agent.ProjectDetailsAPI.getAll();
      runInAction(() => {
        if (Array.isArray(projectDetailsList)) {
          projectDetailsList.forEach(projectdetail => {
            this.setProjectDetails(projectdetail);
          });
          this.projectDetailsList = this.projectDetailsById;
        } else {
          throw new Error("Invalid response format");
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error loading project details';
        console.log(error);
      });
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  }

  loadProjectDetailsById = async (id: string) => {
    this.loadingInitial = true;
    try {
      const projectDetailsList = await agent.ProjectDetailsAPI.getAll();
      console.log("list",projectDetailsList,"id",id);
      runInAction(() => {
        if (Array.isArray(projectDetailsList)) {
          const projectDetails = projectDetailsList
            .map(this.convertProjectDetail)
            .find(project => project.projectId == id);
          if (projectDetails) {
            this.selectedProjectDetails = projectDetails;
          }
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error loading project details';
        console.log(error);
      });
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadProjectDetail = async (id: string) => {
    let projectdetail = this.getProjectDetails(id);
    if (projectdetail) {
      this.selectedProjectDetails = projectdetail;
      return projectdetail;
    } else {
      this.loadingInitial = true;
      try {
        projectdetail = await agent.ProjectDetailsAPI.getById(id);
        runInAction(() => {
          this.selectedProjectDetails = projectdetail;
          this.setProjectDetails(projectdetail!);
        });
        return projectdetail;
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  }

  createProjectDetails = async (project: ProjectDetails, videoFile: File | undefined, imageFiles: File[]) => {
    const formData = new FormData();
    Object.keys(project).forEach(key => {
      formData.append(key, (project as any)[key]);
    });
    if (videoFile) {
      formData.append('videoFile', videoFile);
    }

    // Append image files
    imageFiles.forEach(file => {
      formData.append('ImageFiles', file);
    });

    this.setLoading(true);
    try {
      await agent.ProjectDetailsAPI.create(formData);
      await this.loadProjectDetails();
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || 'Error creating project detail';
      });
      console.error('Error creating project detail:', error.response || error.message || error);
    } finally {
      this.setLoading(false);
    }
  };

  updateProjectDetails = async (projectdetail: FormData) => {
    this.setLoading(true);
    try {
      await agent.ProjectDetailsAPI.update(projectdetail);
      await this.loadProjects();
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || 'Error updating project';
      });
      console.error('Error updating project detail:', error.response || error.message || error);
    } finally {
      this.setLoading(false);
    }
  };

  deleteProjectDetail = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.ProjectDetailsAPI.delete(id);
      runInAction(() => {
        this.projectDetailsList = this.projectDetailsList.filter(p => p.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error deleting project detail';
        this.loading = false;
      });
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }

  loadProjects = async () => {
    this.setLoading(true);
    try {
      const projects = await agent.Projects.getAll();
      runInAction(() => {
        this.projects = projects;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error loading projects';
      });
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(state: boolean) {
    runInAction(() => {
      this.loading = state;
    });
  }

  private getProjectDetails = (id: string) => {
    return this.projectDetailsRegistry.get(id);
  }

  private setProjectDetails = (project: ProjectDetails) => {
    this.projectDetailsRegistry.set(project.id, project);
  }
}
