import { httpService } from './http.service'

export const userService = {
  getUsers,
  login,
  logout,
  getLoggedInUser,
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'
const BASE_URL = `user/`

async function login(credentials: {}) {
  try {
    let user = await httpService.post('auth/login', credentials)
    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
  } catch (err) {
    console.log('Cannot login', err)
    throw err
  }
}

async function logout() {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, '')
  try {
    return await httpService.post('auth/logout')
  } catch (err) {
    console.log(`Cannot logout:`, err)
  }
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN) as string)
}

async function getUsers() {
  try {
    return await httpService.get(BASE_URL)
  } catch (err) {
    console.log('Cannot get users ', err)
  }
}
