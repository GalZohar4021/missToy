import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { userService } from "../services/user.service.js"
import { toyService } from "../services/toy.service.js"

import { ReviewEdit } from "./review-edit.jsx"
import { ReviewList } from "./review-list.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { addToyReply } from "../store/toy.actions.js"
import { addUserReply } from "../store/user.actions.js"


export function Reviews({ source , type}) {
    const [reviews, setReviews] = useState(source.msg ? source.msg : [])
    const user = useSelector((storeState) => storeState.userModule.user)

    function onReviewSubmit(review) {
        const newReviews = [...reviews, review]
        source.msg = newReviews

        if(type === 'toy') addToyReply(source , review)
        else if(type === 'user') addUserReply(source , review)
        setReviews(source.msg)
    }
    

    return <section className="reviews">
        {
            userService.getLoggedinUser() &&
            <ReviewEdit onReviewSubmit={onReviewSubmit} user={user} />
        }
        <h1 className="review-header">Reviews</h1>
        <ReviewList reviews={reviews} />
    </section>
}
