import { IMessage, drawMessage } from "../../models/message";
import Tool from "../Tool";
import React from 'react';
import { setter } from "../UndoRedo";
import undoRedo from '../UndoRedo';
import { Chart, IDot } from "./Chart";


export class LineChart extends Chart{

    constructor (canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
    }

    
    drawLines () {
        for ( let i = 0; i < this.dotsLength ; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(this.dots[i].x, this.dots[i].y)
            this.ctx.lineTo(this.dots[i + 1].x, this.dots[i + 1].y)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    draw (isDots: boolean) {
        this.getReadyDots()
        if (isDots) {
            this.drawDots()
        }
        this.setNumbersOnDots()
        this.drawLines()
    }

}