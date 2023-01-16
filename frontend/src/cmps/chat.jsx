import { useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { socketService } from "../services/socket.service"
import { SOCKET_EMIT_SET_TOPIC , SOCKET_EMIT_SEND_MSG } from "../services/socket.service"


export function Chat({ room, user }) {
    const sender = useSelector((storeState) => storeState.userModule.user)
    const [history, setHistory] = useState([])
    const elInputRef = useRef()
    useEffect(() => {
        // socketService.emit(SOCKET_EMIT_SET_TOPIC, sender.username+'&'+user.username)
    }, [])

    function onSendMsg() {
        const msg = elInputRef.current.value
        if (!msg.length) return

        setHistory((prevHistory) => [...prevHistory, { name: sender.username, msg }])
        // socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
        elInputRef.current.value = ''
    }

    return <section className="flex-col chat-window">
        <div className="chat-history flex-col">
            {
                history.map(msg => {
                    return <span className="msg-line">{msg.name}: <span className="msg-text">{msg.msg}</span></span>
                })
            }

        </div>
        <div className="chat-input flex-row">
            <input ref={elInputRef} className='chat-input-msg' type='text' placeholder="Enter message" />
            <button className='button-chat button' onClick={onSendMsg}>Send</button>
        </div>
    </section>
}