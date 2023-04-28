import React from 'react'
import { Navbar } from 'react-bootstrap'
import '../styles/app.scss'

type Props = {}

const Header = (props: Props) => {
  return (
    <Navbar bg='primary' variant='dark' className='header'>
      <Navbar.Brand className='header_brand'>
        Paint Online [Math and Bussiness]
      </Navbar.Brand>
    </Navbar>
  )
}

export default Header