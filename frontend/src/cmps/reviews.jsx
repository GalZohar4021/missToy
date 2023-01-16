import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { userService } from "../services/user.service.js"
import { toyService } from "../services/toy.service.js"

import { ReviewEdit } from "./review-edit.jsx"
import { ReviewList } from "./review-list.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { addToyReply } from "../store/toy.actions.js"


export function Reviews({ toy }) {
    const [reviews, setReviews] = useState(toy.msg ? toy.msg : [])
    const user = useSelector((storeState) => storeState.userModule.user)

    function onReviewSubmit(review) {
        const newReviews = [...reviews, review]
        toy.msg = newReviews

        addToyReply(toy , review)
        setReviews(toy.msg)
    }

    // async function onToySave() {
    //     const saved = await toyService.save(toy)
    //     console.log('toy saved', saved)
    //     showSuccessMsg('Toy saved!')
        
    // }

    return <section className="reviews">
        {
            userService.getLoggedinUser() &&
            <ReviewEdit onReviewSubmit={onReviewSubmit} user={user} />
        }
        <h1 className="review-header">Reviews</h1>
        <ReviewList reviews={reviews} />
    </section>
}
