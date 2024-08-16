import { makeAutoObservable, runInAction } from 'mobx';
import { Project } from '../models/Project';
import agent from '../api/agent';
import { toJS } from 'mobx';

export default class ProjectStore {
  projects: Project[] = [];
  selectedProject: Project | undefined = undefined;
  selectedProjects: Project[] = [];
  loading = false;
  error: string | null = null;
  projectRegistry = new Map<string, Project>();
  editMode = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get projectById() {
    return Array.from(this.projectRegistry.values()).sort((a, b) => Number(a.id) - Number(b.id));
  }

  loadProjects = async (): Promise<Project[]> => {
    this.loadingInitial = true;
    try {
        const projects = await agent.Projects.getAll();
        runInAction(() => {
            projects.forEach(project => {
                this.setProjects(project);
            });
            this.projects = this.projectById;
        });
        return projects; // Return the loaded projects
    } catch (error) {
        runInAction(() => {
            this.error = 'Error loading projects';
        });
        console.log(error);
        return []; // Return an empty array in case of error
    } finally {
        runInAction(() => {
            this.loadingInitial = false;
        });
    }
  }

  loadProject = async (id: string) => {
    let project = this.getProjects(id);
    if (project) {
      this.selectedProject = project;
      return project;
    } else {
      this.loadingInitial = true;
      try {
        project = await agent.Projects.getById(id);
        runInAction(() => {
          this.selectedProject = project;
          this.setProjects(project!);
        });
        return project;
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  }

  createProject = async (project: FormData) => {
    this.setLoading(true);
    try {
      await agent.Projects.create(project);
      await this.loadProjects();
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || 'Error creating project';
      });
      console.error('Error creating project:', error.response || error.message || error);
    } finally {
      this.setLoading(false);
    }
  };
  

  updateProject = async (project: FormData) => {
    this.setLoading(true);
    try {
      await agent.Projects.update(project);
      await this.loadProjects();
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || 'Error updating project';
      });
      console.error('Error updating project:', error.response || error.message || error);
    } finally {
      this.setLoading(false);
    }
  };

  deleteProject = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Projects.delete(id);
      runInAction(() => {
        this.projects = this.projects.filter(p => p.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error deleting project';
        this.loading = false;
      });
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }

  selectProject = async (project: Project) => {
    try {
      await agent.Projects.select(project.id);
  
      runInAction(() => {
        // If selectedProjects is not already an array, initialize it as an empty array
        if (!Array.isArray(this.selectedProjects)) {
          this.selectedProjects = [];
        }
  
        // Check if the project is already in the array to avoid duplicates
        const projectExists = this.selectedProjects.some(p => p.id === project.id);
  
        if (!projectExists) {
          // Add the selected project to the selectedProjects array
          this.selectedProjects.push(project);
        }
  
        console.log("Selected Projects (after push):", this.selectedProjects);
      });
    } catch (error) {
      console.error("Error selecting project:", error);
    }
  };
  
  deselectProject = async (project: Project) => {
    try {
      await agent.Projects.deselect(project.id);
      runInAction(() => {
        this.selectedProjects = this.selectedProjects.filter(p => p.id !== project.id);
      });
    } catch (error) {
      console.error("Error deselecting project:", error);
    }
  };

  loadSelectedProjects = async () => {
    try {
      const selectedProjects = await agent.Projects.getSelected();
      runInAction(() => {
        this.selectedProjects = selectedProjects ?? []; // Handle undefined cases
      });
      return selectedProjects;
    } catch (error) {
      console.error("Error loading selected projects:", error);
    }
  }

  // loadSelectedProjects = async () => {
  //   try {
  //       const selectedProjects = await agent.Projects.getSelected();
  //       runInAction(() => {
  //           this.selectedProjects.replace(selectedProjects ?? []);
  //       });
  //   } catch (error) {
  //       console.error("Error loading selected projects:", error);
  //   }
  // }


  private setLoading(state: boolean) {
    runInAction(() => {
      this.loading = state;
    });
  }

  private getProjects = (id: string) => {
    return this.projectRegistry.get(id);
  }

  private setProjects = (project: Project) => {
    this.projectRegistry.set(project.id, project);
  }
}
