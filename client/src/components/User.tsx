import React from 'react'
import { IUser } from '../models/IUser'
import '../styles/User.scss'
import { FormText } from 'react-bootstrap'

interface IUserProps {
    user: IUser
    i: number
}

const User = ({user, i}:IUserProps) => {
  return (
    <>
        <FormText >{user.username}</FormText>
    </>
  )
}

export default User