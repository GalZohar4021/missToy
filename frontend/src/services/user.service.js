import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user/'

export const userService = {
    // query,
    getById,
    remove,
    update,
    login,
    logout,
    getLoggedinUser,
    saveLocalUser,
    getUsers
}

window.userService = userService


// function query() {
//     return httpService.get(BASE_URL)
// }


async function getById(userId) {
    return httpService.get(BASE_URL + userId)
}


async function remove(userId) {
    return httpService.delete(BASE_URL + userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    if (user._id) return httpService.put(BASE_URL, user)
    else return httpService.post(BASE_URL, user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
    else return null
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, username: user.username, score: user.score, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return (user) ? JSON.parse(user) : null
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

function getUsers() {
    // return storageService.query('user')
    return httpService.get(BASE_URL)
}