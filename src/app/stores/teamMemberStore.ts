import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { TeamMember } from '../models/TeamMember';

// export default class TeamMemberStore {
//   teamMembers: TeamMember[] = [];
//   selectedTeamMember: TeamMember | undefined = undefined;
//   loading = false;
//   error: string | null = null;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   loadTeamMembers = async () => {
//     this.loading = true;
//     try {
//       const teamMembers = await agent.TeamMembers.getAll();
//       runInAction(() => {
//         this.teamMembers = teamMembers;
//         this.loading = false;
//       });
//     } catch (error) {
//       runInAction(() => {
//         this.error = 'Error loading team members';
//         this.loading = false;
//       });
//     }
//   }

//   loadTeamMember = async (id: number) => {
//     this.loading = true;
//     try {
//       const teamMember = await agent.TeamMembers.getById(id);
//       runInAction(() => {
//         this.selectedTeamMember = teamMember;
//         this.loading = false;
//       });
//     } catch (error) {
//       runInAction(() => {
//         this.error = 'Error loading team member';
//         this.loading = false;
//       });
//     }
//   }

//   createTeamMember = async (teamMember: FormData) => {
//     this.loading = true;
//     try {
//       await agent.TeamMembers.create(teamMember);
//       runInAction(() => {
//         this.loadTeamMembers();
//       });
//     } catch (error: any) {
//       runInAction(() => {
//         this.error = error;
//       });
//     } finally {
//       runInAction(() => {
//         this.loading = false;
//       });
//     }
//   };

//   updateTeamMember = async (teamMember: FormData) => {
//     this.loading = true;
//     try {
//       await agent.TeamMembers.update(teamMember);
//       runInAction(() => {
//         this.loadTeamMembers();
//       });
//     } catch (error: any) {
//       runInAction(() => {
//         this.error = error;
//       });
//     } finally {
//       runInAction(() => {
//         this.loading = false;
//       });
//     }
//   };

//   deleteTeamMember = async (id: number) => {
//     this.loading = true;
//     try {
//       await agent.TeamMembers.delete(id);
//       runInAction(() => {
//         this.teamMembers = this.teamMembers.filter(tm => tm.id !== id);
//         this.loading = false;
//       });
//     } catch (error) {
//       runInAction(() => {
//         this.error = 'Error deleting team member';
//         this.loading = false;
//       });
//     }
//   }
// }

export default class TeamMemberStore {
  teamMembers: TeamMember[] = [];
  selectedTeamMember: TeamMember | undefined = undefined;
  selectedTeamMembers: TeamMember[] = [];
  loading = false;
  error: string | null = null;
  teamMemberRegistry = new Map<string, TeamMember>();
  editMode = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get teamMemberById() {
    return Array.from(this.teamMemberRegistry.values()).sort((a, b) => a.id.localeCompare(b.id));
  }

  loadTeamMembers = async (): Promise<TeamMember[]> => {
    this.loadingInitial = true;
    try {
      const teamMembers = await agent.TeamMembers.getAll();
      runInAction(() => {
        teamMembers.forEach(member => {
          this.setTeamMember(member);
        });
        this.teamMembers = this.teamMemberById;
      });
      return teamMembers;
    } catch (error) {
      runInAction(() => {
        this.error = 'Error loading team members';
      });
      console.log(error);
      return [];
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  }

  loadTeamMember = async (id: string) => {
    let teamMember = this.getTeamMember(id);
    if (teamMember) {
      this.selectedTeamMember = teamMember;
      return teamMember;
    } else {
      this.loadingInitial = true;
      try {
        teamMember = await agent.TeamMembers.getById(id);
        runInAction(() => {
          this.selectedTeamMember = teamMember;
          this.setTeamMember(teamMember!);
        });
        return teamMember;
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  }

  createTeamMember = async (teamMember: FormData) => {
    this.setLoading(true);
    try {
      await agent.TeamMembers.create(teamMember);
      await this.loadTeamMembers();
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || 'Error creating team member';
      });
      console.error('Error creating team member:', error.response || error.message || error);
    } finally {
      this.setLoading(false);
    }
  };

  updateTeamMember = async (teamMember: FormData) => {
    this.setLoading(true);
    try {
      await agent.TeamMembers.update(teamMember);
      await this.loadTeamMembers();
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || 'Error updating team member';
      });
      console.error('Error updating team member:', error.response || error.message || error);
    } finally {
      this.setLoading(false);
    }
  };

  deleteTeamMember = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.TeamMembers.delete(id);
      runInAction(() => {
        this.teamMembers = this.teamMembers.filter(tm => tm.id !== id);
        this.teamMemberRegistry.delete(id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error deleting team member';
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

  private getTeamMember = (id: string) => {
    return this.teamMemberRegistry.get(id);
  }

  private setTeamMember = (teamMember: TeamMember) => {
    this.teamMemberRegistry.set(teamMember.id, teamMember);
  }
}