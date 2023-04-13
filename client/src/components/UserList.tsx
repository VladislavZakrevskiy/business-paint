import React from 'react'
import { useAppSelector } from '../store/hooks'
import User from './User'
import '../styles/User.scss'
import '../styles/canvas.scss'

type Props = {}

const UserList = (props: Props) => {
    const {users} = useAppSelector(state => state.userSlice)


  return (
    <div className="canvas">
        <div className='user-list'>
            {
                users.map( (user, i) => <User user={user} i={i + 1}/>)
            }
        </div>
    </div>
        
    )
}

export default UserList