import { toyService } from '../services/toy.service'
import { store } from '../store/store.js'
import { SET_TOYS, REMOVE_TOY, EDIT_TOY, ADD_TOY } from './toy.reducer'
import { SET_IS_LOADING } from './app.reducer'

export function loadToys(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


// // Example for Optimistic mutation:
export function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .catch(err => {
            // store.dispatch({ type: UNDO_REMOVE_CAR })
            console.log('Had issues Removing toy', err)
            throw err
        })
}

// export function removeToyNormal(toyId) {
//     return toyService.remove(toyId)
//         .then(() => {
//             store.dispatch({ type: REMOVE_TOY, toyId })
//         })
//         .catch(err => {
//             console.log('Had issues Removing toy', err)
//             throw err
//         })
// }

export function saveToy(toy) {
    const type = (toy._id) ? EDIT_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}

export async function addToyReply(toy, msg) {
    store.dispatch({ type: EDIT_TOY, toy: { ...toy, msg: [...toy.msg, msg] } })
    return await toyService.addToyReply(toy, msg)

}