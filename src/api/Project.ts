import axios from 'axios'
import { API_HOST } from "./index";

export async function getProject(id: string) {
  try {
    const res = await axios.get(`${API_HOST}/projects/${id}`)
    return res
  } catch (e) {
    console.error(`Cannot get project ${id}`, e)
    throw e
  }
}