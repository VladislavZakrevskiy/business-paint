// @ts-nocheck
import { drawMessage } from "../models/message";
import Tool from "./Tool";
import React from 'react';
import undoRedo, { setter } from './UndoRedo';



export default class Circle extends Tool {

    mouseDown: boolean = false
    startX: number = 0
    startY: number = 0
    saved: string = ''
    radius: number = 0


    constructor(canvas: HTMLCanvasElement | null,socket: WebSocket, id: string, undoRedo: undoRedo) {
        super(canvas, socket, id, undoRedo)
        this.listen()
    }

    listen() {
        // @ts-ignore
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        // @ts-ignore
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        // @ts-ignore
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this) 
    }

    mouseUpHandler(e: React.FormEvent<HTMLCanvasElement>) {
        this.mouseDown = false
        const msg: drawMessage = {
            id: this.id,
            method: 'draw',
            figure: {
                x: this.startX,
                y: this.startY,
                fillColor: this.ctx?.fillStyle,
                strokeColor: this.ctx?.strokeStyle,
                lineWidth: this.ctx?.lineWidth,
                radius: this.radius,
                type: 'circle'
            }
        }
        this.socket?.send(JSON.stringify(msg))

        const finish: drawMessage = {
            id: this.id,
            method: 'draw',
            figure: {
                type: 'finish',
                x: this.startX,
                y: this.startY
            }
        }
        this.socket?.send(JSON.stringify(finish))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx?.beginPath()
        // @ts-ignore
        this.startX = e.pageX- e.target.offsetLeft
        // @ts-ignore
        this.startY = e.pageY - e.target.offsetTop
        // @ts-ignore
        this.saved = this.canvas?.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown){
            // @ts-ignore
            let currentX = e.pageX- e.target.offsetLeft
            // @ts-ignore
            let currentY = e.pageY - e.target.offsetTop
            this.radius = Math.sqrt(Math.abs((this.startX - currentX)**2-(this.startY - currentY)**2))
            // @ts-ignore
            this.draw(this.startX, this.startY)
        }
    }

    draw(x: number, y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            // @ts-ignore
            this.ctx?.clearRect(0, 0, this.canvas?.width , this.canvas?.height)
            // @ts-ignore
            this.ctx?.drawImage(img, 0, 0, this.canvas?.width , this.canvas?.height)
            this.ctx?.beginPath()
            this.ctx?.arc(x,y, this.radius, 0, 2 * Math.PI, false)
            this.ctx?.fill()
            this.ctx?.stroke()
        }
    }

    static staticDraw (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fillColor: string, strokeColor: string, lineWidth: number)  {
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx?.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        ctx?.fill()
        ctx?.stroke()
    }
}