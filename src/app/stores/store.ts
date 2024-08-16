import { createContext, useContext } from 'react';
import NewsStore from './newsStore';
import TeamMemberStore from './teamMemberStore';
import ProjectStore from './projectStore';
import CommonStore from './commonStore';
import AuthenticationStore from './authenticationStore';
import ProjectDetailsStore from './projectDetailsStore';

interface Store {
  commonStore: CommonStore;
  projectStore: ProjectStore;
  projectDetailsStore: ProjectDetailsStore;
  newsStore: NewsStore;
  teamMemberStore: TeamMemberStore;
  authenticationStore: AuthenticationStore;
}

export const store: Store = {
    projectStore: new ProjectStore(),
    projectDetailsStore: new ProjectDetailsStore(),
    newsStore: new NewsStore(),
    teamMemberStore: new TeamMemberStore(),
    authenticationStore: new AuthenticationStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}