import axios from 'axios'
import { API_HOST, getAuthHeaders } from "./index";
import { Project } from '../store/BuilderContext';

export async function getProject(id: string): Promise<{project: Project}> {
  try {
    const res = await axios({
      method: 'GET',
      url: `${API_HOST}/api/projects/${id}`,
      headers: getAuthHeaders()
    })
    return res.data
  } catch (e) {
    console.error(`Cannot get project ${id}`, e)
    throw e
  }
}

export async function listProjects(): Promise<{projects: Project[]}> {
  try {
    const res = await axios({
      url: `${API_HOST}/api/projects`,
      method: 'GET',
      headers: getAuthHeaders()
    })
    return res.data
  } catch (e) {
    console.error(`Cannot get projects`, e)
    throw e
  }
}

export async function updateProject(project: Project): Promise<{project: Project}> {
  try {
    const res = await axios({
      url: `${API_HOST}/api/projects/${project.id}`,
      method: 'PUT',
      data: {
        project,
      },
      headers: getAuthHeaders()
    })
    return res.data
  } catch (e) {
    console.error(`Cannot get projects`, e)
    throw e
  }
}

export async function createProject(project: Partial<Project>): Promise<{project: Project}> {
  try {
    const res = await axios({
      url: `${API_HOST}/api/projects`,
      method: 'POST',
      headers: getAuthHeaders(),
      data: {
        project,
      },
    })
    return res.data
  } catch (e) {
    console.error(`Cannot create project`, e)
    throw e
  }
}