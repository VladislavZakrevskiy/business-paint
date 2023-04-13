import { IMessage, drawMessage } from "../../models/message";
import Tool from "../Tool";
import React from 'react';
import { setter } from "../UndoRedo";
import undoRedo from '../UndoRedo';

export interface IDot {
    x: number
    y: number
}

export default class LineChart{

    width: number = 600
    height: number = 400
    dots: IDot[] = []
    dotsLength: number = 0
    private namesX: string[] = []
    private canvas: HTMLCanvasElement 
    private ctx: CanvasRenderingContext2D 
    private socket: WebSocket
    private id: string = ''
    private stepY: number = 0
    private stepX: number = 0
    private lastDot: IDot = {x: 0, y: 0}
    private firstDot: IDot = {x: 0, y: 0}
    private dashesX: number[] = []
    private dashesY: number[] = []
    private difDotsY: number = 0    
    private difDotsX: number = 0
    private partsY:number = 0
    private partsX: number = 0

    constructor (canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        //@ts-ignore
        this.ctx = canvas.getContext('2d')
    }

    setDot(y: number) {
        const dot: IDot = {x: 200, y}
        this.dots.push(dot)
        this.sortDotsByX()
        this.dotsLength = this.dots.length
    }

    setName(name: string) {
        this.namesX.push(name)
    }

    private sortDotsByX() {
        this.dots = this.dots.sort((a,b) => a.x - b.x)
    }

    private recalcHeightDots () {
        this.countParts()
        for(let i = 0; i < this.dotsLength; i ++) {
            this.dots[i].x = i * this.partsY * 2 
        }
    }

    private countConfigugation() {
        let DotsY: Set<number> = new Set()
        let DotsX: Set<number> = new Set()
        let lastDot: IDot
        let firstDot: IDot

        for(let i = 0;i < this.dotsLength;i++) {
            if(this.lastDot.x <= this.dots[i].x && this.lastDot.y <= this.dots[i].y) {
                lastDot = this.dots[i]
            }
            if(this.firstDot.x >= this.dots[i].x && this.firstDot.y >= this.dots[i].y) {
                firstDot = this.dots[i]
            }
            DotsX.add(this.dots[i].x)
            console.log(this.dots[i].x)
            DotsY.add(this.dots[i].y)
        }
        //@ts-ignore
        this.lastDot = lastDot
        //@ts-ignore
        this.firstDot = firstDot
        this.difDotsX = DotsX.size
        this.difDotsY = DotsY.size
    }

    private countAbsoluteXY () {
        for(let i = 0;i < this.dotsLength;i + this.stepX) {
            this.dashesX.push(this.width + i) 
        }

        for(let i = 0;i < this.dotsLength;i + this.stepY) {
            this.dashesY.push(this.width + i) 
        }
    }

    joinDots () {
        for (let i = 0; i < this.dotsLength;i++){
            this.ctx.beginPath()
            this.ctx.moveTo(this.dots[i].x, this.dots[i].y)
            this.ctx.lineTo(this.dots[i + 1].x, this.dots[i + 1].y)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    private countParts () {
        console.log(this.difDotsX)
        this.partsX = this.width / this.difDotsX
        this.partsY = this.height / this.difDotsY
        this.dotsLength = this.dots.length
    }

    drawWeb () {
        this.countParts()
        for (let i = 0; i < this.width; i + this.partsX) {
            this.ctx.beginPath()
            this.ctx.moveTo(i, 0)
            this.ctx.lineTo(i, this.height)
            this.ctx.fill()
            this.ctx.stroke()
            i += this.partsY
        }
        for (let i = 0; i < this.width;) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, i)
            this.ctx.lineTo(this.width, i)
            this.ctx.fill()
            this.ctx.stroke()
            i += this.partsY
        }
    }

    draw() {
        this.ctx?.clearRect(0, 0, this.canvas?.width , this.canvas?.height)
        this.countConfigugation()
        this.drawWeb()
        this.recalcHeightDots()
        this.joinDots()

        for(let i = 0; i < this.dotsLength; i++) {
            let x: number = this.dots[i].x
            let y: number = this.height - this.dots[i].y
            this.ctx.beginPath()
            this.ctx?.arc(x, y, 3, 0, 2 * Math.PI, false)
            this.ctx.fillStyle = '#0045ad'
            this.ctx.strokeStyle = '#0045ad'
            this.ctx?.fill()
            this.ctx?.stroke()
        }
    }
}