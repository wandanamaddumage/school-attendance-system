export const getAccessToken = () => localStorage.getItem("access_token")

export const setAccessToken = (token: string) => localStorage.setItem("access_token", token)

export const handleRefreshTokenProcess = async (): Promise<boolean> => {
  // Example: call refresh endpoint if your backend provides one
  // For now, return false if no refresh logic
  return false
}

export const handleForceLogout = () => {
  localStorage.removeItem("access_token")
  window.location.href = "/login"
}
