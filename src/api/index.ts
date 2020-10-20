// @ts-ignore
export const API_HOST = process.env.NODE_ENV === 'production' ? 'https://backend.cs-go.monster' : 'http://localhost:4000'

export const AUTH_API_HOST = process.env.NODE_ENV === 'production' ? 'https://backend.cs-go.monster' : 'https://localhost:4000'

export function getAuthHeaders() {
  return {
    Authorization: localStorage.getItem('token')
  }
}