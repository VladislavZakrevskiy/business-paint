import { Chart } from "../Chart"

export class Drawer extends Chart {

    halfWidth: number = this.width / 2
    halfHeight: number = this.height / 2

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
    }

    setDotXY (x: number, y: number) {
        this.dots.push({x, y, name: ''})
    }

    drawXYCoord() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.halfWidth, this.padding)
        this.ctx.lineTo(this.halfWidth, this.height - this.padding)
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(this.padding, this.halfHeight)
        this.ctx.lineTo(this.width - this.padding, this.halfHeight)
        this.ctx.stroke()
    }

    normilize () {
        this.setDotCount()
        this.setMaxDot()
        const maxY = this.maxDot.y
        for(let i = 0; i < this.dotsLength; i++) {
            this.dots[i].x = (this.dots[i].x / 2) + this.halfWidth
            this.dots[i].y = this.halfHeight - ( this.dots[i].y / maxY ) * this.height
        }
    }

    draw() {
        this.normilize()
        this.drawXYCoord()
        this.drawBorder()
        for(let i = 0; i < this.dotsLength - 1; i++) {
            if (this.dots[i].y < this.height - this.padding &&
                this.dots[i].y > this.padding &&
                this.dots[i].x > this.padding &&
                this.dots[i].x < this.width - this.padding ) 
            {
                this.ctx.beginPath()
                this.ctx.moveTo(this.dots[i].x, this.dots[i].y)
                this.ctx.lineTo(this.dots[i+1].x, this.dots[i+1].y)
                this.ctx.arc(this.dots[i].x, this.dots[i].y, 0.5, 0, 2 * Math.PI)
                this.ctx.fill()
                this.ctx.stroke()       
            }
        }
    }
}