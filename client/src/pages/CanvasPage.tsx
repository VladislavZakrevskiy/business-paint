import React from 'react'
import ToolBar from '../components/ToolBar'
import Settings from '../components/Settings'
import Canvas from '../components/Canvas'
import UserList from '../components/UserList'

type Props = {}

const CanvasPage = (props: Props) => {
  return (
    <div className='app'>
      <ToolBar/>
      <Settings/>
      <UserList/>
      <Canvas/>
    </div>
  )
}

export default CanvasPage