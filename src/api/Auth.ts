import axios from 'axios'
import { AUTH_API_HOST } from "./index";

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
