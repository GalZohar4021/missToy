import { useDispatch, useSelector } from 'react-redux'

import { useEffect , useState } from 'react'
import { useNavigate } from 'react-router'

import { toyService } from '../services/toy.service.js'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { loadToys , removeToy } from '../store/toy.actions.js'


export function ToysIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.appModule.app.isLoading)
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])



    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }
    
    function onEditToy(toy) {
        navigate(`/toy/edit/${toy._id}`)
    }

    function onRemoveToy(toyId) {
        toyService.remove(toyId)
            .then(() => {
                console.log('removing...', toyId)
                const updatedBooks = toys.filter(toy => toy._id !== toyId)
                removeToy(toyId)

            })
    }

    return <section className="toys-index">
         <ToyFilter onSetFilter={onSetFilter} />

        <div>
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />}
        </div>
    </section>

}