import { userService } from '../../services/user.service.js'
import { SET_USER, store, UPDATE_USER } from '../store.js'

export function login(credentials) {
  // console.log('credentials: ',credentials)
  return userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
    })
    .catch((err) => {
      console.log('user actions -> Cannot login: ', err)
      throw err
    })
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
    })
    .catch((err) => {
      console.log('user actions -> Cannot signup: ', err)
      throw err
    })
}

export function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: SET_USER, user: null })
    })
    .catch((err) => {
      console.log('user actions -> Cannot logout: ', err)
      throw err
    })
}



export function updateUser(user) {
  // TODO keep working on updating the user
  return userService
    .update(user)
    .then((savedUser) => {
      store.dispatch({ type: UPDATE_USER, user: savedUser })
    })
    .catch((err) => {
      console.log('todo action -> Cannot save todo: ', err)
      throw err
    })
}