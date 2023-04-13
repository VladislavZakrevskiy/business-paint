import React from 'react'
import '../styles/toolbar.scss'
import { useAppDispatch } from '../store/hooks'
import { setLineWidth, setStrokeColor } from '../store/reducers/toolSlice'

type Props = {}

const Settings = (props: Props) => {
  const dispatch = useAppDispatch()


  return (
    <div className='settings'>
        <label htmlFor='line'>Толщина</label>
        <input 
          onChange={(e)=> dispatch(setLineWidth(e.target.value))}
          style={{margin: '0 10px'}} 
          id='line' 
          type="number" 
          defaultValue={1} 
          min={1} 
          max={100}/>
        <label htmlFor='stroke'>Цвет Обводки</label>
        <input 
          onChange={(e)=> dispatch(setStrokeColor(e.target.value))}
          style={{margin: '0 10px'}} 
          id='line' 
          type="color" />
    </div>
  )
}

export default Settings