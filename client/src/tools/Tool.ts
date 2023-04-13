import React from 'react';
import undoRedo from './UndoRedo';


export default class Tool {
    canvas: HTMLCanvasElement | null = null
    ctx: CanvasRenderingContext2D | null | undefined = null
    socket: WebSocket | null = null
    id: string = ''
    undoRedo: undoRedo | null = null
    
    constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, id: string, undoRedo: undoRedo){
       this.undoRedo = undoRedo
       this.canvas = canvas
       this.ctx = canvas?.getContext('2d')
       this.socket = socket
       this.id = id
       this.destroyEv()
    }

    set fillColor(color: string) {
        this.ctx!.fillStyle = color
    }

    set strokeColor(color: string) {
        this.ctx!.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx!.lineWidth = width
    }

    destroyEv() {
        // @ts-ignore
        this.canvas.onmousedown = null
        // @ts-ignore
        this.canvas.onmouseup = null
        // @ts-ignore
        this.canvas.onmousemove = null 
    }
}