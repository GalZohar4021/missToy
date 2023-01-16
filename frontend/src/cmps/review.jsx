import { useEffect, useRef } from "react"

export function Review({ review }) {
    const color = review.rank >= 4 ? '#28ae47b0' : review.rank < 2 ? '#f53c3cb0' : '#bea90eb0'


    return <div className="review-box">
        <span className="review-name">{review.name}</span> | <span className="review-rank" style={{color: color}}>Rank: {review.rank}</span>
        <pre className="review-text">{review.text}</pre>
    </div>
}