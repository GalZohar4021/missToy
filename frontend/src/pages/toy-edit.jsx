import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { store } from "../store/store.js"
import { SET_IS_LOADING } from "../store/app.reducer.js"
import { uploadImg } from "../services/uploadImg.service"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
            .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value

        if (field === 'inStock') {
            return setToyToEdit((prevToy) => ({ ...prevToy, inStock: target.checked }))
        }
        else if (field === 'labels') {
            const labels = (target.value) ? [...toyToEdit.labels, target.label] : toyToEdit.labels.filter(toy => toy !== target.label)
            return setToyToEdit((prevToy) => ({ ...prevToy, labels }))
        }
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }


    function getLabelStyle(color, state) {
        return state ? { border: '3px solid ' + color, backgroundColor: color, color: 'white' } : { border: '3px outset ' + color, backgroundColor: 'white', color: color }
    }

    function onToySave(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit).then((toy) => {
            console.log('toy saved', toy);
            showSuccessMsg('Toy saved!')
            navigate(`/toy/${toy._id}`)
        })
    }

    async function uploadThumb(ev) {
        const url = await uploadImg(ev)
        console.log(url)
        setToyToEdit((prevToy) => ({ ...prevToy, thumbnail: url }))
    }

    return <section className="toy-edit">
        <h2 className="editor-header">{toyId ? 'Edit this toy' : 'Add a new toy'}</h2>

        {
            <form onSubmit={onToySave} className='edit-form flex-col'>
                <label htmlFor="name">Name</label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="img-input" className="image-upload-custom">Upload image!</label>
                <input type="file" id="img-input" name="thumb-input" onChange={uploadThumb} hidden />

                <img className="thumb" src={toyToEdit.thumbnail} alt={toyToEdit.name} />

                <label htmlFor="price">Price</label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price..."
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <label htmlFor="in-stock">In stock?</label>
                <input type="checkbox"
                    name="inStock"
                    id="in-stock"
                    checked={toyToEdit.inStock}
                    onChange={handleChange}
                />


                <div className="labels-editor-bar grid">
                    {
                        toyService.getLabels().map(label => {
                            const state = toyToEdit.labels.includes(label)
                            return <span key={label} onClick={() => handleChange({ target: { name: 'labels', value: !state, label } })} className={'label-editor' + (state ? ' on' : '')}
                                style={getLabelStyle(toyService.getLabelsColors(label), state)}>{label}</span>
                        })
                    }

                </div>

                <div className="editor-tools flex-row">
                    <button type='submit'>{toyId ? 'Save' : 'Add'}</button>
                    <Link to={`/toy/${toyToEdit._id}`}>Cancel</Link>
                </div>

            </form>
        }
    </section >
}
