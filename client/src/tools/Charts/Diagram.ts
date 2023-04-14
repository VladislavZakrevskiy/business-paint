import { current } from "@reduxjs/toolkit";
import Circle from "../Circle";
import undoRedo from "../UndoRedo";

export interface IData {
    data: number
    color: string
}

export class Diagram extends Circle {

    procents: number[] = []
    data: IData[] = []
    colors: string[] = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00', '#dcd36a', '#52361b', '#633a34', '#541b3b', '#ff7ac3']
    
    constructor (canvas: HTMLCanvasElement, socket: WebSocket, id: string, tool: undoRedo) {
        super(canvas, socket, id, tool)
    }

    clearNumbers() {
        this.data = []
    }

    setNumber (
        number: number, 
        color: string = this.colors[Math.floor(Math.random() * 11)]
    ) {
        this.data.push({color: color, data: +number})
    }

    countProcent() {
        let sum: number = 0
        for (let i = 0; i < this.data.length;i++) {
            sum += +this.data[i].data
        }
        for(let i = 0; i < this.data.length; i++ ) {
            this.data[i].data = this.data[i].data / sum
        }
    }

    normalizeToAngle (x: number, y: number) {
        var total_value = 0;
        var color_index = 0;
        for (let i in this.data) {
            var val = this.data[i].data;
            total_value += val; 
        }

        var start_angle = 0;
        for ( let i in this.data ) {
        val = this.data[i].data;
        let slice_angle = 2 * Math.PI * val / total_value;

        this.drawPieSlice(
            x,
            y,
            this.radius,
            start_angle,
            start_angle+slice_angle,
            this.data[color_index % this.colors.length].color
            );   

            start_angle += slice_angle;
            color_index++;
        }  
    }

    mouseUpHandler() {
        this.mouseDown = false

    }

    drawPieSlice( centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number, color: string ) {
        this.ctx!.fillStyle = color;
        this.ctx?.beginPath();
        this.ctx?.moveTo(centerX, centerY);
        this.ctx?.arc(centerX, centerY, radius, startAngle, endAngle );
        this.ctx?.closePath();
        this.ctx?.fill();
       }

    draw (x: number, y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            // @ts-ignore
            this.ctx?.clearRect(0, 0, this.canvas?.width , this.canvas?.height)
            // @ts-ignore
            this.ctx?.drawImage(img, 0, 0, this.canvas?.width , this.canvas?.height)
            this.normalizeToAngle(x, y)
        }
    }


    
}