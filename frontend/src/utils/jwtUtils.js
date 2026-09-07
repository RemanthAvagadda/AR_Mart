// Decode JWT token and extract payload
export const decodeToken = (token) => {
 try {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null

  const payload = parts[1]
  const decoded = JSON.parse(atob(payload))
  return decoded
 } catch (error) {
  console.error('Error decoding token:', error)
  return null
 }
}

// Get user role from token
export const getUserRole = (token) => {
 const decoded = decodeToken(token)
 return decoded?.role || null
}

// Check if user is admin
export const isAdminUser = (token) => {
 return getUserRole(token) === 'admin'
}
