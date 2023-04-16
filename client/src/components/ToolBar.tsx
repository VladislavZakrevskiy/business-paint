import React, { ChangeEvent } from 'react'
import '../styles/toolbar.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setBezierChart, setChart, setDiagram, setEquation, setFillColor, setStrokeColor, setTool, } from '../store/reducers/toolSlice'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Eraser from '../tools/Eraser'
import Circle from '../tools/Circle'
import Line from '../tools/Line'
import undoRedo from '../tools/UndoRedo'
import { ToggleButton } from 'react-bootstrap'
import { LineChart } from '../tools/Charts/LineChart'
import { BezierChart } from '../tools/Charts/BezierChart'
import { Diagram } from '../tools/Charts/Diagram'
import { Drawer } from '../tools/Charts/Parser/Drawer'
import Equation from './Equation';

type Props = {}

const ToolBar = (props: Props) => {
  const dispatch = useAppDispatch()
  const {canvas, tool, id, socket} = useAppSelector(state => state.canvasSlice)

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFillColor(e.target.value))
    dispatch(setStrokeColor(e.target.value))
  }

  const save = () => {
    const dataURL = canvas?.toDataURL()
    const a = document.createElement('a')
    a.href = dataURL
    a.download = id + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className='toolbar'>
        <button 
          className='toolbar_btn brush' 
          onClick={(() => dispatch(setTool(new Brush(canvas, socket, id, tool))))}/>
        <button 
          className='toolbar_btn rect'
          onClick={() => dispatch(setTool(new Rect(canvas, socket, id, tool)))}
          />
        <button 
          className='toolbar_btn circle'
          onClick={() => dispatch(setTool(new Circle(canvas, socket, id, tool)))}
          />
        <button 
          className='toolbar_btn eraser'
          onClick={() => dispatch(setTool(new Eraser(canvas, socket, id, tool)))}
          />
        <button 
          className='toolbar_btn line'
          onClick={() => dispatch(setTool(new Line(canvas, socket, id, tool)))}
          />
        <input 
          type='color' 
          className='toolbar_btn'
          onChange={changeColor}
          />
        <button
          className=''
          onClick={() => dispatch(setChart(new LineChart(canvas, socket, id)))}
        >
          Line Chart
        </button>
        <button
          className=''
          onClick={() => dispatch(setBezierChart(new BezierChart(canvas, socket, id)))}
        >
          Bezier Chart
        </button>
        <button
          className=''
          onClick={() => dispatch(setDiagram(new Diagram(canvas, socket, id, tool)))}
        >
          Diagram
        </button>
        <button
          className=''
          onClick={() => dispatch(setEquation(new Drawer(canvas, socket, id)))}
        >
          Equation
        </button>
        <button 
          className='toolbar_btn undo'
          onClick={() => undoRedo.sendUndoMsg(id, socket)}
          />
        <button 
          className='toolbar_btn redo'
          onClick={() => undoRedo.sendRedoMsg(id, socket)}
          />
        <button 
          className='toolbar_btn save'
          onClick={save}
          />
      </div>
  )
}

export default ToolBar