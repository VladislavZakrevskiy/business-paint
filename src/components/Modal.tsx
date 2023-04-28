import React, { useState } from 'react'
import { setUsername } from '../store/reducers/canvasSlice'
import { useAppDispatch } from '../store/hooks'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../styles/User.scss'

const ModalComponent = () => {
    const [value, setValue] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)
    const [code, setCode] = useState<string>('')
    const nav = useNavigate()
    const dispatch = useAppDispatch()

    const connectionHandler = () => {
      if(code) {
        nav(`/${code}`)
      }
        dispatch(setUsername(value))
        setShow(false)
      }

  return (
    <Modal show={show} >
        <Modal.Header>
          <Modal.Title>Введите имя</Modal.Title>
        </Modal.Header>
        <Modal.Body className='form'>
          <input placeholder='Name' type="text" value={value} onChange={e => setValue(e.target.value)} />
          <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder='Code of Room'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => connectionHandler()}>
            Enter
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent