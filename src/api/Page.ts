import axios from 'axios'
import { API_HOST, getAuthHeaders } from "./index";
import { CustomPage, Project } from '../store/BuilderContext';

export async function createProjectPage(projectId: string, page: CustomPage): Promise<{project: Project}> {
  try {
    const res = await axios({
      method: 'POST',
      url: `${API_HOST}/api/projects/${projectId}/pages`,
      headers: getAuthHeaders(),
      data: {
        page,
      }
    })
    return res.data
  } catch (e) {
    console.error(`Cannot create new page for project ${projectId}`, e)
    throw e
  }
}