import React from 'react'
import { useAppSelector } from '../store/hooks'
import User from './User'
import '../styles/User.scss'
import { ListGroup } from 'react-bootstrap'
import IdCode from './IdCode'

type Props = {}

const UserList = (props: Props) => {
    const {users} = useAppSelector(state => state.userSlice)


  return (
    <ListGroup as='ol' numbered className='user-component' >
            <IdCode/>
            {
                users.map( user => 
                    <ListGroup.Item as={'li'}>
                        {user.username}
                    </ListGroup.Item>)
            }
        
    </ListGroup>
        
    )
}

export default UserList