import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { TeamMember } from '../models/TeamMember';

export default class TeamMemberStore {
  teamMembers: TeamMember[] = [];
  selectedTeamMember: TeamMember | undefined = undefined;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadTeamMembers = async () => {
    this.loading = true;
    try {
      const teamMembers = await agent.TeamMembers.getAll();
      runInAction(() => {
        this.teamMembers = teamMembers;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error loading team members';
        this.loading = false;
      });
    }
  }

  loadTeamMember = async (id: number) => {
    this.loading = true;
    try {
      const teamMember = await agent.TeamMembers.getById(id);
      runInAction(() => {
        this.selectedTeamMember = teamMember;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error loading team member';
        this.loading = false;
      });
    }
  }

  createTeamMember = async (teamMember: FormData) => {
    this.loading = true;
    try {
      await agent.TeamMembers.create(teamMember);
      runInAction(() => {
        this.loadTeamMembers();
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateTeamMember = async (teamMember: FormData) => {
    this.loading = true;
    try {
      await agent.TeamMembers.update(teamMember);
      runInAction(() => {
        this.loadTeamMembers();
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteTeamMember = async (id: number) => {
    this.loading = true;
    try {
      await agent.TeamMembers.delete(id);
      runInAction(() => {
        this.teamMembers = this.teamMembers.filter(tm => tm.id !== id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error deleting team member';
        this.loading = false;
      });
    }
  }
}