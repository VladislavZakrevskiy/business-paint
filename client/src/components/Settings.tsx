import  { ChangeEvent, useState } from 'react'
import '../styles/toolbar.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFillColor, setLineWidth, setStrokeColor } from '../store/reducers/toolSlice'
import { Form } from 'react-bootstrap'

type Props = {}

const Settings = (props: Props) => {
  const dispatch = useAppDispatch()
  const [stroke, setStroke] = useState<string>('')
  const [fill, setFill] = useState<string>('')

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFillColor(e.target.value))
    dispatch(setStrokeColor(e.target.value))
    setFill(e.target.value)
    setStroke(e.target.value)
  }

  const changeStroke = (e: ChangeEvent<HTMLInputElement>) => {
    setStroke(e.target.value)
    dispatch(setStrokeColor(e.target.value))
  }

  return (
    <div className='settings'>
        <label htmlFor='line'>Толщина</label>
        <Form.Range 
          onChange={(e)=> dispatch(setLineWidth(e.target.value))}
          style={{margin: '0 10px'}} 
          id='line' 
          defaultValue={1} 
          min={1} 
          max={100}/>
        <Form.Label htmlFor='stroke'>Цвет Обводки</Form.Label>
        <Form.Control 
          onChange={changeStroke}
          value={stroke}
          className='settings_btn'
          id='line' 
          type="color" />
        <Form.Label htmlFor='allColor'>Цвет Обводки</Form.Label>
        <Form.Control 
          className='settings_btn'
          id="allColor"
          value={fill}
          type='color' 
          onChange={changeColor}
          />
    </div>
  )
}

export default Settings