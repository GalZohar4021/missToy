import { Reviews } from './reviews'
import { useSelector } from 'react-redux'
import { Chat } from './chat'


export function ChatUser() {
    const user = useSelector((storeState) => storeState.userModule.userAction)
    return user && <Chat user={user} room={null}/>
}