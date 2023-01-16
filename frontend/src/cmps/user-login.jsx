
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { store } from '../store/store.js'
import { signup, login, logout } from '../store/user.actions.js'
import { SET_USER } from '../store/user.reducer.js'

import { Link } from 'react-router-dom'


function getEmptyCredentials() {
    return {
        username: '',
        password: ''
    }
}

export function Login() {
    const user = useSelector((storeState) => storeState.userModule.user)

    const [credentials, setCredentials] = useState(getEmptyCredentials())

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        return login(credentials)
            .then((user) => {
                store.dispatch({ type: SET_USER, user })
                showSuccessMsg(`Welcome ${user.fullname}`)
            })
            .catch(err => {
                showErrorMsg('OOps try again')
            })
    }

    const { username, password } = credentials
    return <section className='login-bar'>

        {
            !user ? <div className="login-page">

                <form className="login-form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleCredentialsChange}
                        required
                        autoFocus
                    />

                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleCredentialsChange}
                        required
                    />

                    <button className='button'>{'Login'}</button>
                </form>
            </div >
                :
                <div className='logged-bar flex-row'>
                    <h1 className='logged-welcome'> Welcome back <Link className='username-welcome' to={`/user/${user._id}`}> {user.username}</Link></h1>
                    <button className='button logout' onClick={logout}>Logout</button>
                </div>
        }
    </section>

}

