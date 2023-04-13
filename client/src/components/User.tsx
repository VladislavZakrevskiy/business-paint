import React from 'react'
import { IUser } from '../models/IUser'
import '../styles/User.scss'

interface IUserProps {
    user: IUser
    i: number
}

const User = ({user, i}:IUserProps) => {
  return (
    <div className='user'>
        <p>{i}.</p>
        <p>{user.username}</p>
    </div>
  )
}

export default User