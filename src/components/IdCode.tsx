import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { Button, Form, FormText } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../styles/User.scss'


const IdCode = () => {
    const {id} = useAppSelector(state => state.canvasSlice)
    const inputRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState<string>(id)
    const nav = useNavigate()

    useEffect(() => {
        setValue(id)
    }, [id])


    const reset = () => {
        inputRef.current!.textContent = id
    }

    const copy = () => {
        if(value){
            navigator.clipboard.writeText(value);
        }
        else navigator.clipboard.writeText(id);
    }

    const changeRoom = () => {
        nav(`/${value}`)
    }

    return (
    <div className='id-form'>
        <Form.Text>
            {value}
        </Form.Text>
        <Form.Control/>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={copy}>Copy</Button>
        <Button onClick={changeRoom}>Change Room</Button>
    </div>
  )
}

export default IdCode