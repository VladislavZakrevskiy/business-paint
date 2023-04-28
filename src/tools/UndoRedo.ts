import { IMessage } from "../models/message"

export interface setter {
  undo: string[]
  redo: string[]
}

export default class undoRedo {
    canvas: HTMLCanvasElement | null = null
    ctx: CanvasRenderingContext2D | null = null
    undoList: string[] = []
    redoList: string[] = []
    socket: WebSocket | null = null
    id: string = ''
    dispatch: any = ''

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string, dispatch: any) {
        this.socket = socket
        this.id = id
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.dispatch = dispatch
    }

    get getUndoList () {
      return this.undoList
    }

    get getRedoList () {
      return this.redoList
    }

    set setUndoRedo ({undo, redo}: setter) {
      this.undoList = undo
      this.redoList = redo
    }

    pushUndo(canvasURL: string) {
        this.undoList.push(canvasURL)
    }

    pushRedo(canvasURL: string) {
        this.redoList.push(canvasURL)
    }

    undo() {
        if(this.undoList.length > 0) {
            const dataURL = this.undoList.pop()
            //@ts-ignore
            this.pushRedo(this.canvas?.toDataURL())
            const img = new Image()
            //@ts-ignore
            img.src = dataURL
            img.onload = () => {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
            //@ts-ignore
            this.ctx?.drawImage(img, 0,0,this.canvas.width, this.canvas.height)
            }
          } else {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
          }

    }

    static sendUndoMsg (id: string, socket: WebSocket) {
      const msg: IMessage = {
        id: id,
        method: 'undoRedo',
        type: 'undo'
      }
      socket?.send(JSON.stringify(msg))
    }


    redo() {
        if(this.redoList.length > 0) {
            const dataURL = this.redoList.pop()
            const img = new Image()
            //@ts-ignore
            img.src = dataURL
            img.onload = () => {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
            //@ts-ignore
            this.ctx?.drawImage(img, 0,0,this.canvas.width, this.canvas.height)
            } 
          } else {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
          }
    }

    static sendRedoMsg (id: string, socket: WebSocket) {
      const msg: IMessage = {
        id: id,
        method: 'undoRedo',
        type: 'redo'
      }
      console.log(msg )
      socket?.send(JSON.stringify(msg))
    }
}