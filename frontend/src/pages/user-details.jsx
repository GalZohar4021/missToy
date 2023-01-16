import { useSelector } from 'react-redux'

import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router'
import { userService } from '../services/user.service'

import { Link } from 'react-router-dom'
import { store } from '../store/store'
import { SET_USER_ACTION_ID } from '../store/user.reducer'

export function UserDetails() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [userProfile, setUserProfile] = useState(null)
    
    const defaultUrl = 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'
    
    const navigate = useNavigate()
    const { userId } = useParams()
    
    useEffect(() => {
        if (!userId) {
            console.log('Had issues with loading user details')
            return navigate('/')
        }
        loadUser()
        
    }, [])

    async function loadUser() {
        try {
            
            const userDetails = await userService.getById(userId)
            if (!userDetails.logo) userDetails.logo = defaultUrl

            store.dispatch({type: SET_USER_ACTION_ID , userAction: userDetails})
            setUserProfile(userDetails)
        }
        catch {
            console.log('Had issues with loading user details')
            navigate('/')
        }
    }

    return userProfile?._id && <section className="user-profile-page">
        <div className='user-title-box flex-row'>
            <img className='user-logo' src={userProfile.logo} />
            <div className='flex-col user-profile-header'>
                <span className='user-header-uname'>{userProfile.username}</span>
                <span className='user-header-fname'>{userProfile.fullname}</span>
                <nav className='flex-row user-profile-tabs'>
                    <Link className='button username-nav-tabs' to={`/user/${userProfile._id}/details`}>Details</Link>
                    <Link className='button username-nav-tabs' to={`/user/${userProfile._id}/reviews`}>Reviews</Link>
                    {
                        (user && (user.isAdmin || userProfile._id === user._id)) &&
                        <Link className='button username-nav-tabs' to={`/user/${userProfile._id}/edit`}>Edit Profile</Link>
                    }
                    {
                        (user && userProfile._id !== user._id) &&
                        <Link className='button username-nav-tabs' to={`/user/${userProfile._id}/chat`}>Chat</Link>
                    }
                </nav>
            </div>
        </div>
            <div className='profile-tab'>
                <Outlet />
            </div>
    </section>
}