import { storageService } from "./async-storage.service.js"


export const userService = {
    login,
    logout,
    signup,
    getById,
    query,
    update,
    getLoggedinUser,
    getEmptyCredentials
}

const USER_KEY_LOGGEDIN = 'user'
const USER_KEY = 'userDB'

function query() {
    return storageService.query(USER_KEY)
}

function getById(userId) {
    return storageService.get(USER_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    user.createdAt = user.updatedAt = Date.now()
    user.balance = 10000,
    user.activities = []

// console.log('user server: ',user)
    return storageService.post(USER_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(USER_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY_LOGGEDIN))
}


function update(user) {
    if (!user._id) return null 
        // TODO - updatable fields
        user.updatedAt = Date.now()
        return storageService.put(USER_KEY, user)
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance }
    sessionStorage.setItem(USER_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999,
//     balance: 10000,
//     activities: [{txt: 'Added a Todo', at: 1523873242735}]
// }

