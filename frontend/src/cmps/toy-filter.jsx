import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


import { toyService } from "../services/toy.service.js"

export function ToyFilter({ onSetFilter }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const elFormRef = useRef(null)
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        console.log(value, field)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onClearFilter() {
        setFilterByToEdit(toyService.getDefaultFilter())
        onSetFilter(toyService.getDefaultFilter())
    }

    function toggleFiltersBox() {
        elFormRef.current.classList.toggle('show')
    }

    return <section className="toy-tools">
        <a className="filters-button" onClick={toggleFiltersBox} ><span className="material-symbols-outlined">filter_alt</span></a>
        {
            user?.isAdmin &&
            <Link to={`/toy/edit`}><span className="material-symbols-outlined">add</span></Link>
        }
        <div className="form-box" ref={elFormRef}>
            <h2>Filter</h2>
            <form className="form-filter grid">

                <label htmlFor="name">Name</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />



                <label htmlFor="maxPrice">Max price</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice}
                    onChange={handleChange}
                />

                {/* <label htmlFor="subtitle">Subtitle</label>
                <input type="text"
                    id="subtitle"
                    name="subtitle"
                    placeholder="By subtitle"
                    value={filterByToEdit.subtitle}
                    onChange={handleChange}
                />

                <label htmlFor="published-at">Publish year</label>
                <input type="number"
                    id="published-date"
                    name="publishedDate"
                    placeholder="By publish year"
                    value={filterByToEdit.publishedDate}
                    onChange={handleChange}
                />


                <label htmlFor="author">Author</label>
                <input type="text"
                    id="author"
                    name="author"
                    placeholder="By author"
                    value={filterByToEdit.author}
                    onChange={handleChange}
                /> */}


                {/* <label htmlFor="maxPagesCount">Max pages count</label>
                <input type="number"
                    id="maxPagesCount"
                    name="pageCount"
                    placeholder="By max pages count"
                    value={filterByToEdit.pageCount}
                    onChange={handleChange}
                /> */}


            </form>
            <div className="filter-actions">
                <button onClick={onSubmitFilter}>Update filter</button>
                <button onClick={onClearFilter}>Clear</button>
            </div>
        </div>
    </section>
}