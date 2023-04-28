import { IUser } from '../models/IUser';
import { IMessage, connectionMessage, drawMessage } from '../models/message';
import { pushUsers, setUsers } from '../store/reducers/UserSlice';
import { setSocket } from '../store/reducers/canvasSlice';
import { setTool } from '../store/reducers/toolSlice';
import Brush from '../tools/Brush';
import undoRedo from '../tools/UndoRedo';
import { ConnectionWS } from './connectionWS';
import { drawHandler } from "./drawWS"


export const connectWS = (username: string | null, id: string , dispatch: any, canvas: HTMLCanvasElement, tool: undoRedo, users: IUser[]) => {
    if( username ) {
        const socket = new WebSocket('ws://localhost:5000/')
        dispatch(setSocket(socket))
        dispatch(setTool(new Brush(canvas, socket, id, tool)))
        const msg: connectionMessage = {
          id: id,
          method: 'connection',
          username: username
        }
        socket.onopen = () => {
          socket.send(JSON.stringify(msg))
        }
        socket.onmessage = (ev) => {
          const msg: IMessage = JSON.parse(ev.data)
          switch(msg.method) {
            case 'connection':                
              ConnectionWS(socket, msg, username, users)
              break;
            case 'draw': 
              //@ts-ignore
              drawHandler(msg, canvas, tool)
              break;
            case 'users': 
              //@ts-ignore
              dispatch(setUsers(msg.users))
             break;
            case 'undoRedo': 
              if(msg.type == 'undo') {
                tool.undo()
              }
              else {
                tool.redo()
              }
              break;
          }
        }
    }
}