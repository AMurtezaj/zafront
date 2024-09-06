import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Project } from '../models/Project';
import { ProjectDetails } from '../models/ProjectDetails';
import { News } from '../models/News';
import { TeamMember } from '../models/TeamMember';
import { Admin } from '../models/admin';
import { ServerError } from '../models/serverError';
import { store } from '../stores/store';

interface ErrorResponseData {
  errors?: { [key: string]: string[] };
}

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

axios.defaults.baseURL = 'http://98.81.111.84:5143/api';
//axios.defaults.baseURL = 'https://localhost:7009/api';

const token = localStorage.getItem("jwt");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.request.use(config => {
  const token = store.commonStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(async response => {
  await sleep(1000);
  return response;
}, (error: AxiosError) => {
  if (error.response) {
    const { data, status, config } = error.response;
    const typedData = data as ErrorResponseData;

    switch (status) {
      case 400:
        if (config.method === 'get' && typedData.errors?.hasOwnProperty('id')) {
          return 'error';
        }
        if (typedData.errors) {
          const modalStateErrors: string[] = [];
          for (const key in typedData.errors) {
            if (typedData.errors[key] && Array.isArray(typedData.errors[key])) {
              modalStateErrors.push(...typedData.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
      case 404:
        toast.error('not found');
        break;
        case 500:
            toast.error('/server-error');
            store.commonStore.setServerError(data as ServerError);
            break;
      default:
        toast.error('unexpected error');
    }
  } else {
    console.error('Network Error', error);
    toast.error('Network error or server not reachable');
  }

  return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Projects = {
  getAll: () => requests.get<{ result: Project[] }>('/Project').then(data => data.result),
  getById: (id: string) => requests.get<Project>(`/Project/${id}`),
  create: (projects: FormData) => requests.post<void>('/Project', projects),
  update: (projects: FormData) => requests.put<void>(`/Project/${projects.get('id')}`, projects),
  delete: (id: string) => requests.del<void>(`/Project/${id}`),
  select: (id: string) => requests.post<void>(`/Project/${id}/select`, {}),
  deselect: (id: string) => requests.post<void>(`/Project/${id}/deselect`, {}),
  getSelected: () =>
    requests.get<{ result: Project[] }>('/Project/selected').then(data => data.result), 

  //getSelected: () => requests.get<{result: Project[]}>('/Project/selected').then(data => data.result)
};

const ProjectDetailsAPI = {
  getAll: () => requests.get<{result: ProjectDetails[]}>('/ProjectDetails').then(data => data.result),
  getById: (id: string) => requests.get<ProjectDetails>(`/ProjectDetails/${id}`),
  create: (formData: FormData): Promise<void> => axios.post('/ProjectDetails', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }).then(responseBody),
  /*update: (id: string, formData: FormData): Promise<void> => axios.put(`/videoupload/${id}`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }).then(responseBody), */
  update: (projectdetails: FormData) => requests.put<void>(`/ProjectDetails/${projectdetails.get('id')}`, projectdetails),
  //delete: (id: string): Promise<void> => requests.del(`/videoupload/${id}`)
  delete: (id: string) => requests.del<void>(`/ProjectDetails/${id}`)
};

const NewsApi = {
  getAll: () => requests.get<{ result: News[] }>('/News').then(data => data.result),
  getById: (id: number) => requests.get<News>(`/News/${id}`),
  create: (news: FormData) => requests.post<void>('/News', news),
  update: (news: FormData) => axios.put<void>(`/News/${news.get('id')}`, news), 
  delete: (id: number) => requests.del<void>(`/News/${id}`)
};

const TeamMembers = {
  getAll: () => requests.get<{ result: TeamMember[] }>('/TeamMember').then(data => data.result),
  getById: (id: number) => requests.get<TeamMember>(`/TeamMember/${id}`),
  create: (teamMember: FormData) => requests.post<void>('/TeamMember', teamMember),
  update: (teamMember: FormData) => axios.put<void>(`/TeamMember/${teamMember.get('id')}`, teamMember),
  delete: (id: number) => requests.del<void>(`/TeamMember/${id}`)
};

const Authentication = {
  login: (credentials: Admin) => requests.post<{ token: string }>('/Admin/Login', credentials),
  logout: () => requests.post<void>('/Admin/Logout', {})
};

const BlobAPI = {
  generateSasToken: (blobName: string, containerName: string) =>
      requests.get<{ token: string }>(`/blob/generateSasToken?blobName=${blobName}&containerName=${containerName}`)
};


const agent = {
  Projects,
  ProjectDetailsAPI,
  NewsApi,
  TeamMembers,
  Authentication,
  BlobAPI
};

export default agent;
