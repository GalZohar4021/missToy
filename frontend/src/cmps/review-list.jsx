import { Review } from "./review.jsx"

export function ReviewList({ reviews }) {
    let reviewCount = 0
    return <ul className="review-list flex-col">
            {!reviews.length && <h2 className="no-reviews">There are no reviews yet to show</h2>}
            {reviews.map(review => <li key={'review-' + ++reviewCount}>
                <Review review={review} />
            </li>)}
    </ul>
}