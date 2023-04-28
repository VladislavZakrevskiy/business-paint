import React, {useEffect, useRef} from 'react'
import '../styles/canvas.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCanvas, setId, setUndoRedo } from '../store/reducers/canvasSlice'
import undoRedo from '../tools/UndoRedo'
import {useParams} from 'react-router-dom'
import { connectWS } from '../utils/connectWS'
import { postPng } from '../utils/postPng'
import { loadStartPng } from '../utils/loadStartPng'
import ModalComponent from './Modal'


const Canvas = () => {
  const dispatch = useAppDispatch()
  const canvasRef = useRef(null)
  const {tool, username, socket} = useAppSelector(state => state.canvasSlice)
  const {users} = useAppSelector(state => state.userSlice)
  const {id} = useParams()


  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
    //@ts-ignore
    dispatch(setUndoRedo(new undoRedo(canvasRef.current, socket, id, dispatch)))
  }, [])

  useEffect(() => {
    dispatch(setId(id))
    //@ts-ignore
    connectWS(username, id, dispatch, canvasRef.current, tool, users)
    //@ts-ignore
    loadStartPng(id!, canvasRef.current)
    }, [username])

  const mouseUpHandler = () => { 
    //@ts-ignore
    postPng(id!, canvasRef.current)
  }



  return (
    <div className='canvas'> 
        <ModalComponent/>
        <canvas onMouseUp={mouseUpHandler} ref={canvasRef} width={600} height={400}
        />
    </div>
  )
}

export default Canvas

