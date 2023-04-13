import React from 'react'
import ToolBar from '../components/ToolBar'
import Settings from '../components/Settings'
import Canvas from '../components/Canvas'
import UserList from '../components/UserList'
import ChartBar from '../components/ChartBar'

type Props = {}

const CanvasPage = (props: Props) => {
  return (
    <div className='app'>
      <ToolBar/>
      <Settings/>
      <UserList/>
      <Canvas/>
      <ChartBar/>
    </div>
  )
}

export default CanvasPage