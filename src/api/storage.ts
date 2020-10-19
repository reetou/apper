export const getToken = () => {
  return localStorage.getItem('token')
}

export const storeToken = (token: string) => {
  return localStorage.setItem('token', token)
}
