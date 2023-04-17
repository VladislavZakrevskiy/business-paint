import React from 'react'
import ToolBar from '../components/ToolBar'
import Settings from '../components/Settings'
import Canvas from '../components/Canvas'
import LineChartBar from '../components/ChartBar'
import DiagramBar from '../components/DiagramBar'
import BezierChartBar from '../components/BezierChartBar'
import Equation from '../components/Equation'
import UserList from '../components/UserList'

type Props = {}

const CanvasPage = (props: Props) => {
  return (
    <div className='app'>
      <div>
        <ToolBar/>
        <Settings/>
      </div>
      <Canvas/>
      <UserList/>
      <LineChartBar/>
      <BezierChartBar/>
      <DiagramBar/>
      <Equation/>
    </div>
  )
}

export default CanvasPage