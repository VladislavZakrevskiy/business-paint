import React, { useState } from 'react'
import { setUsername } from '../store/reducers/canvasSlice'
import { useAppDispatch } from '../store/hooks'
import { Modal, Button } from 'react-bootstrap'


const ModalComponent = () => {
    const [value, setValue] = useState('')
    const [show, setShow] = useState(true)
    const dispatch = useAppDispatch()

    const connectionHandler = () => {
        dispatch(setUsername(value))
        setShow(false)
      }

  return (
    <Modal show={show} >
        <Modal.Header>
          <Modal.Title>Введите имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => connectionHandler()}>
            Войти
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent