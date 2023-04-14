import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit"


export interface IDot {
    x: number
    y: number
    name: string
}

export class Chart {
    private padding: number = 25
    arrayY: number[] = []
    dots: IDot[] = []
    maxDot: IDot = {x: 0, y: 0, name: ''}
    dotsLength: number = 0
    canvas: HTMLCanvasElement 
    ctx: CanvasRenderingContext2D 
    socket: WebSocket
    id: string = ''
    width: number = 600
    height: number = 400
    partsX: number = 0
    partsY: number = 0

    constructor (canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        //@ts-ignore
        this.ctx = canvas.getContext('2d')
    }

    clearDot () {
        this.dots = []
    }

    setDot (y: number, name: string) {
        this.arrayY.push(y)
        this.dots.push({x: 200, y, name})
    }

    setDotCount () {
        this.dotsLength = this.dots.length
    }

    setMaxDot () {
        let dots: IDot[] = this.dots.slice(0)
        const length = this.dotsLength
        this.maxDot = dots.sort((a,b) => a.y - b.y)[length - 1]
    }

    getPadding (y: number) {
        return  y < this.height / 2 ? this.padding : 2 * this.padding
    }

    normalize () {
        this.setDotCount()
        this.setMaxDot()
        const maxY = this.maxDot.y
        for (let i = 0; i < this.dotsLength; i++) {
            this.dots[i].y = this.height - (this.dots[i].y / maxY * this.height) + this.getPadding(this.dots[i].y)
        }
    }

    countParts () {
        this.partsX = ( this.width - this.padding * 2) / (this.dotsLength - 1)
        this.partsY = ( this.height - this.padding * 2) / (this.dotsLength - 1)
    }

    readyDots () {
        for(let i = 0; i < this.dotsLength;i++) {
            this.dots[i].x = i * this.partsX + this.padding
        }
    }

    getReadyDots () {
        this?.normalize()
        this?.countParts()
        this?.readyDots()
        this.drawBorder()
    }

    drawWeb (type: 'both' | 'horiz' | 'vert' | 'remove') {
        switch (type) {
            case 'both': 
                this.ctx.clearRect(0, 0, this.width, this.height)
                for(let i = 0; i < this.dotsLength;i++) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(i * this.partsX, this.padding)
                    this.ctx.lineTo(i * this.partsX,( this.height - this.padding ))
                    this.ctx.fill()
                    this.ctx.stroke()

                    // const vertValue = (this.height - Math.round(this.dots[i].y - this.padding)).toString()
                    // this.setNumberOnWeb(vertValue, i * this.partsX,( this.height - this.padding ))

                    this.ctx.beginPath()
                    this.ctx.moveTo(this.padding, i * this.partsY)
                    this.ctx.lineTo((this.width - this.padding), i * this.partsY)
                    this.ctx.fill()
                    this.ctx.stroke()

                    // const horizValue = (this.width - Math.round(this.dots[i].x - this.padding)).toString()
                    // this.setNumberOnWeb(horizValue, (this.width - this.padding), i * this.partsY)
                }

                break;
            case 'horiz':
                this.ctx.clearRect(0, 0, this.width, this.height)
                for(let i = 0; i < this.dotsLength;i++) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.padding, i * this.partsY + this.padding)
                    this.ctx.lineTo((this.width - this.padding), i * this.partsY + this.padding)
                    this.ctx.fill()
                    this.ctx.stroke()

                    // const value = (this.width - Math.round(this.dots[i].x - this.padding)).toString()
                    // this.setNumberOnWeb(value, (this.width - this.padding), i * this.partsY)
                }

                break;
            case 'vert':
                this.ctx.clearRect(0, 0, this.width, this.height)
                for(let i = 0; i < this.dotsLength;i++) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(i * this.partsX + this.padding, this.padding)
                    this.ctx.lineTo(i * this.partsX + this.padding, (this.height - this.padding))
                    this.ctx.fill()
                    this.ctx.stroke()

                    // const value = (this.height - Math.round(this.dots[i].y - this.padding)).toString()
                    // this.setNumberOnWeb(value, i * this.partsX,( this.height - this.padding ))
                }
                break;
            case 'remove':
                this.ctx.clearRect(0, 0, this.width, this.height)
                break;
        }
    }


    drawDots() {
        for ( let i = 0; i < this.dotsLength; i++) {
            const x = this.dots[i].x
            const y = this.dots[i].y
            this.ctx.beginPath()
            this.ctx.arc(x, y, 3, 0, 2 * Math.PI, false)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    setNumberOnWeb (value: string, x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.fillText(value, x, y)
        this.ctx.stroke()
    }

    setNumbersOnDots() {
        for (let i = 0; i < this.dotsLength; i++) {

            let x, y
            if (this.dots[i].x > this.width / 2) {
                x = -60
            } else { x = 10 }
            if (this.dots[i].y > this.height / 2) {
                y = -15
            } else { y = 15 }

            this.ctx.beginPath()
            this.ctx.fillText(this.arrayY[i], this.dots[i].x + x, this.dots[i].y + y)
        }
    }

    drawBorder () {
        this.ctx.rect(this.padding, this.padding, this.width - this.padding * 2, this.height - this.padding * 2)
        this.ctx.stroke()
    }
    
}