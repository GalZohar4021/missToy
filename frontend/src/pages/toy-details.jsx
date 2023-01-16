import { useSelector } from 'react-redux'

import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
// import { Reviews } from './reviews.jsx'


import { Reviews } from '../cmps/reviews.jsx'

export function ToyDetails() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [toy, setToy] = useState(null)
    const defaultUrl = '../assets/img/default.jpg'

    let toyThumbnailRef = useRef()
    let toyLabelsRef = useRef()

    let elPriceRef = useRef()
    let priceColorRef = useRef()
    const { toyId } = useParams()
    const navigate = useNavigate()




    useEffect(() => {
        if (!toyId) return
        loadToy()

    }, [])


    useEffect(() => {
        if (priceColorRef.current && elPriceRef.current) elPriceRef.current.style.color = priceColorRef.current

    }, [toy])



    function loadToy() {
        toyService.getById(toyId)
            .then((toyDetails) => {
                toyThumbnailRef.current = toyDetails.thumbnail ? toyDetails.thumbnail : defaultUrl
                toyLabelsRef.current = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(toyDetails.authors)

                if (toyDetails.price > 150) priceColorRef.current = '#f53c3cb0'
                else if (toyDetails.price < 20) priceColorRef.current = '#28ae47b0'

                setToy(toyDetails)
            })
            .catch((err) => {
                console.log('Had issues with loading toy details', err)
                navigate('/toy')
            })
    }

    function onRemoveToy(toyId) {
        toyService.remove(toyId)
            .then(() => {
                console.log('removing...', toyId)
                navigate('/toy')

            })
    }

    return <section className='toy-details'>
        {toy && <article className="toy-box flex-col">
            <div className="details-box flex-col">
                {!toy.inStock && <span className="out-of-stock for-sale-details">Out of stock</span>}

                <h2 className='title'>{toy.name}</h2>
                <h4 ref={elPriceRef} className='price'>${toy.price.toFixed(2)}</h4>
                <img src={toyThumbnailRef.current} />

                <div className="labels-details-bar grid">
                    {
                        toyService.getLabels().map(label => {
                            if (toy.labels.includes(label)) {
                                const color = toyService.getLabelsColors(label)
                                const style = { border: '3px solid ' + color, backgroundColor: color, color: 'white', textAlign: 'center' }
                                return <span key={label} style={style}>{label}</span>
                            }
                        })
                    }

                </div>

                {
                    user?.isAdmin &&
                    <div className="flex-col">
                        <h4 className='created-at'>Creation Date: {toy.createdAt}</h4>
                        <div className='toy-actions flex-row'>
                            <Link className='button' to={`/toy/edit/${toy._id}`}> Edit</Link>
                            <button className="button toy-remove" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        </div>
                    </div>
                }

            </div>
        </article>}
        {toy && <Reviews toy={toy} />}
    </section>
}