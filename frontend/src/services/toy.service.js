import { utilService } from './util.service'
import { httpService } from './http.service'

// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    remove,
    getById,
    save,
    getLabels,
    getEmptyToy,
    getDefaultFilter,
    getLabelsColors,
    addToyReply
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']


function getLabels() {
    return labels
}


function getEmptyToy() {
    return {
        'name': '',
        'price': 0,
        'labels': [],
        'inStock': true,
        'thumbnail' : ''
    }
}

function query(filterBy = getDefaultFilter()) {
    let queryParams = `?`
    queryParams += filterBy.name.length ? `name=${filterBy.name}&` : ``
    queryParams += filterBy.maxPrice? `maxPrice=${filterBy.maxPrice}` : ``
    if(queryParams === `?`) queryParams = ''

    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (filterBy.name) {
//                 const regex = new RegExp(filterBy.name, 'i')
//                 toys = toys.filter(toy => regex.test(toy.name))
//             }
//             if (filterBy.maxPrice) {
//                 toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
//             }
//             return toys
//         })
// }

function getDefaultFilter() {
    return { name: '', maxPrice: 0 }
}

function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) return httpService.put(BASE_URL, toy)
    else return httpService.post(BASE_URL, toy)
}


function addToyReply(toy, msg) {
    return httpService.post(BASE_URL + toy._id + '/msg', msg)
}

// function _createToys() {
//     const toys = [
//         {
//             '_id': utilService.makeId(),
//             'name': 'New toy A',
//             'price': 105,
//             'labels': ['Doll', 'Battery Powered', 'Baby'],
//             'inStock': true,
//             'thumbnail': 'https://toysrus.co.il/media/catalog/product/cache/55a044f927b05bedf296cf15120d7cf4/1/0/10909_1.jpg'
//         },
//         {
//             '_id': utilService.makeId(),
//             'name': 'New toy B',
//             'price': 100,
//             'labels': ['Doll', 'Battery Powered', 'Baby'],
//             'inStock': true,
//             'thumbnail': 'https://toysrus.co.il/media/catalog/product/cache/1c47e4647c24a1362934f7838cdcd4df/8/4/841333102166_1.jpg'
//         },
//         {
//             '_id': utilService.makeId(),
//             'name': 'New toy C',
//             'price': 50,
//             'labels': ['Doll', 'Battery Powered', 'Baby'],
//             'inStock': true,
//             'thumbnail': 'https://toysrus.co.il/media/catalog/product/cache/1c47e4647c24a1362934f7838cdcd4df/1/9/190587056887_1.jpg'
//         }
//     ]
//     if (!utilService.loadFromStorage(STORAGE_KEY)) {
//         utilService.saveToStorage(STORAGE_KEY, toys)
//     }
// }

function getLabelsColors(label){
    if(label === 'On wheels') return '#e65656'
    if(label === 'Box game') return '#1957c3'
    if(label === 'Art') return '#2dae0c'
    if(label === 'Baby') return '#c7cc3d'
    if(label === 'Doll') return '#e28902'
    if(label === 'Puzzle') return '#ea00ff'
    if(label === 'Outdoor') return '#7504ff'
    if(label === 'Battery Powered') return '#08aa9d'
}