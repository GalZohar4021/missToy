import { useState , useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import { RangeInput } from "./input-range.jsx"


function getEmptyReview(name) {
    return {
        "name": name,
        "text": "",
        "rank" : 1
    }
}


export function ReviewEdit({ onReviewSubmit , user }) {
    const [review, setReview] = useState(getEmptyReview(user.username))


    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (field === 'text') {
            value = target.value
        }
        else value = type === 'range' ? +value : value
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function getRangeChange(val) {
        setReview((prevReview) => ({ ...prevReview, rank: val }))
    }

    function onSubmit() {
        if(review.text.length && review.rank) onReviewSubmit(review)
        setReview(getEmptyReview())
    }

    return <section className="review-edit grid">
        <h1 className="review-header">Add Review</h1>
        <div className="review-line grid">
            <label className="username-review-edit">{user.username}</label>
        </div>

        <div className="review-line grid">
            <label htmlFor='review-rank'>Rank</label>
            <RangeInput name='review-rank' getChange={getRangeChange} min={1} max={5} step={1} />
        </div>

        <div className="review-line grid">
            <label htmlFor='review-text'>Your text</label>
            <textarea name='text' id='review-text' placeholder="Enter your review" onChange={handleChange} value={review.text} maxLength={50} />
        </div>



        <button onClick={() => { onSubmit() }}>Submit</button>

    </section>
}