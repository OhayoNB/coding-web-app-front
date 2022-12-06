import { httpService } from './http.service'
import { utilService } from './util.service'

export const userService = {
   getUsers,
   login,
   logout,
   signup,
   getLoggedInUser,
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'
const BASE_URL = `user/`

async function login(credentials: {}) {
   try {
      let user = await httpService.post('auth/login', credentials)
      if (user)
         sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
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

async function signup(credentials: { imgUrl: string }, isGoogleAuth: boolean) {
   try {
      credentials.imgUrl =
         'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg'
      let user = await httpService.post('auth/signup', credentials)
      sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
      return user
   } catch (err) {
      console.log('Cannot signup', err)
      throw err
   }
}

function getLoggedInUser() {
   return (
      JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN) as string) || {
         fullname: 'Guest',
         username: 'Guest',
         imgUrl:
            'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg',
         _id: utilService.makeId(),
      }
   )
}

async function getUsers() {
   try {
      return await httpService.get(BASE_URL)
   } catch (err) {
      console.log('Cannot get users ', err)
   }
}
