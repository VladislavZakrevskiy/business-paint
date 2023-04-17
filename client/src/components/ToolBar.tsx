// @ts-nocheck
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
import { Button, ToggleButton } from 'react-bootstrap'
import { LineChart } from '../tools/Charts/LineChart'
import { BezierChart } from '../tools/Charts/BezierChart'
import { Diagram } from '../tools/Charts/Diagram'
import { Drawer } from '../tools/Charts/Parser/Drawer'
import Equation from './Equation';

type Props = {}

const ToolBar = (props: Props) => {
  const dispatch = useAppDispatch()
  const {canvas, tool, id, socket} = useAppSelector(state => state.canvasSlice)



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
        <Button 
          className='toolbar_btn brush' 
          onClick={(() => dispatch(setTool(new Brush(canvas, socket, id, tool))))}>Brush</Button>
        <Button 
          className='toolbar_btn rect'
          onClick={() => dispatch(setTool(new Rect(canvas, socket, id, tool)))}
          >Rect</Button>
        <Button 
          className='toolbar_btn circle'
          onClick={() => dispatch(setTool(new Circle(canvas, socket, id, tool)))}
          >Circle</Button>
        <Button 
          className='toolbar_btn eraser'
          onClick={() => dispatch(setTool(new Eraser(canvas, socket, id, tool)))}
          >Eraser</Button>
        <Button 
          className='toolbar_btn line'
          onClick={() => dispatch(setTool(new Line(canvas, socket, id, tool)))}
          >Line</Button>
        <Button
          className=''
          onClick={() => dispatch(setChart(new LineChart(canvas, socket, id)))}
        >
          Line Chart
        </Button>
        <Button
          className=''
          onClick={() => dispatch(setBezierChart(new BezierChart(canvas, socket, id)))}
        >
          Bezier Chart
        </Button>
        <Button
          className=''
          onClick={() => dispatch(setDiagram(new Diagram(canvas, socket, id, tool)))}
        >
          Diagram
        </Button>
        <Button
          className=''
          onClick={() => dispatch(setEquation(new Drawer(canvas, socket, id)))}
        >
          Equation
        </Button>
        <Button 
          className='toolbar_btn save'
          onClick={save}
          >Save</Button>
        <Button 
          className='toolbar_btn undo'
          onClick={() => undoRedo.sendUndoMsg(id, socket)}
        >{'<--'}</Button>
        <Button 
          className='toolbar_btn redo'
          onClick={() => undoRedo.sendRedoMsg(id, socket)}
          >{'-->'}</Button>
      </div>
  )
}

export default ToolBar