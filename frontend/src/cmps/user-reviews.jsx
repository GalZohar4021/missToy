import { Reviews } from './reviews'
import { useSelector } from 'react-redux'

export function UserReviews() {
    const user = useSelector((storeState) => storeState.userModule.userAction)
    console.dir(user)
    return user && <Reviews source={user} type={'user'} />
}