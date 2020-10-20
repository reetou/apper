import axios from 'axios'
import { API_HOST, AUTH_API_HOST, getAuthHeaders } from "./index";
import { IUser } from "../types/user";

export async function sendResetPassword(login: string) {
  try {
    const res = await axios.post(`${AUTH_API_HOST}/resetPassword`, {
      login,
    })
    return res
  } catch (e) {
    console.error(`Cannot send reset password`, e)
  }
}

export async function sendLogin(login: string, password: string) {
  try {
    await axios.post(`${AUTH_API_HOST}/auth`, {
      login,
      password,
    })
  } catch (e) {
    console.error(`Cannot send login`, e)
  }
}

export async function sendRegister(login: string, password: string) {
  try {
    await axios.post(`${AUTH_API_HOST}/register`, {
      login,
      password,
    })
  } catch (e) {
    console.error(`Cannot send register`, e)
  }
}

export async function checkAuth(): Promise<{user: IUser}> {
  try {
    const res = await axios({
      method: 'POST',
      url: `${API_HOST}/api/auth/check`,
      headers: getAuthHeaders()
    })
    return res.data
  } catch (e) {
    console.error(`Cannot send check auth`, e)
    throw e
  }
}

