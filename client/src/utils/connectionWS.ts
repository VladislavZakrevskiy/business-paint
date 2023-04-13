import { IUser } from "../models/IUser"
import { IMessage } from "../models/message"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { pushUsers } from "../store/reducers/UserSlice"


export const ConnectionWS = (socket: WebSocket, msg: IMessage,username: string, users: IUser[]) => {
    console.log(`connected user ${username}`)
    const userMsg: IMessage = {
    id: msg.id, 
    method: 'users'
    }
    socket.send(JSON.stringify(userMsg))
}