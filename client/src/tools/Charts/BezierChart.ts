import { Chart, IDot } from "./Chart";



export class BezierChart extends Chart {

    constructor (canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
    }

    // findK (dotA: IDot, dotB: IDot, dotC: IDot = dotB) {
    //     if (!dotC) {
    //         dotC = dotB
    //     }
    //     let yA, yB, yC, xA, subYaYb, subYaYc, c, k, s, xLeft, yLeft, xRight, yRight
    //     yA = dotA.y; yC = dotC.y
    //     this.deltaX = dotB.x - dotA.x
    //     if ()
    // }

    // findW () {
    //     this.w = (this.deltaX / 2) * Math.sqrt(1 / (1 + this.k**2))
    // }

    // findCpDots (dotA: IDot, dotB: IDot, dotC: IDot = dotB) {
    //     this.findK(dotA, dotB, dotC)
    //     this.findW()
    //     let dotB1: IDot = {
    //         x: dotA.x - this.w,
    //         y: dotA.y - this.k * this.w,
    //         name: ''
    //     }

    //     let dotC1: IDot = {
    //         x: dotA.x + this.w,
    //         y: dotA.y + this.k * this.w,
    //         name: ''
    //     }

    //     return {B1: dotB1, C1: dotC1}
    // }

    // draw (isDots: boolean) {
    //     this.getReadyDots()
    //     this.drawDots()
    //     console.log('ok')
    //     for (let i = 1; i<this.dotsLength; i++) {
    //         let dotA = this.dots[i]
    //         let dotB = this.dots[i + 1]
    //         let dotC = this.dots[i + 2]
    //         const {B1, C1} = this.findCpDots(dotA, dotB, dotC)
    //         this.ctx.beginPath()
    //         this.ctx.moveTo(dotA.x, dotB.y)
    //         if()

    //         this.ctx.stroke()
    //         i +=2

    //     }
    // }

    // getPointY (point: number) {
    
    // }

    // draw () {
    //     this.getReadyDots()
    //     this.drawDots()
    //     let yA, yB, yC, xA, subYaYb, subYaYc, c, k, s, xLeft, yLeft, xRight, yRight
    //     let xStretchSqr = this.partsX ** 2
    //     yA = this.dots[0].y 
    //     yC = this.dots[0].y

    //     this.ctx.moveTo(0, 0)
    //     for (let i = 1; i < this.dotsLength - 1;i++) {
    //         yB = yA
    //         yA = yC
    //         console.log(i)
    //         yC = this.dots[i + 1].y

    //         xA = this.dots[i].x

    //         if ( i < this.dotsLength - 2 ) {
    //             subYaYb = yA - yB
    //             subYaYc = yA - yC

    //             if(subYaYb !== subYaYc) {
    //                 k = (Math.sqrt((xStretchSqr + subYaYb * subYaYb) * (xStretchSqr + subYaYc * subYaYc)) - xStretchSqr - subYaYb * subYaYc) / (this.partsX * (yC - yB));
    //             } else { k = 0 }

    //             s = this.partsX / 2 * Math.sqrt( 1 / (1 + k**2))

    //             xLeft = xA - s
    //             yLeft = yA - k * s
    //             xRight = xA + s
    //             yRight = yA + k * s
    //         }

    //         if ( i == 1) {
    //             this.ctx.quadraticCurveTo(xLeft, yLeft, xA, yA)
    //         } else if ( i < this.dotsLength - 2) {
    //             this.ctx.bezierCurveTo(xRight, yRight, xLeft, yLeft, xA, yA)
    //         } else {
    //             this.ctx.quadraticCurveTo(xRight, yRight, xA, yA)
    //         }
    //     }

    //     this.ctx.stroke()
    // }

    draw () {
        this.getReadyDots()
        this.drawDots()
        var xStretch = this.partsX;//

        var xStretchSqr = xStretch * xStretch;
        var yA, yB, yC, xA, subYaYb, subYaYc, k, s, xLeft, yLeft, xRight, yRight;
        
        this.ctx.beginPath();
        yA = this.dots[0].y//
        yC = this.dots[1].y//
        
        this.ctx.moveTo(this.padding, yA);//
        for (var i = 1; i < this.dotsLength; i++) {
        yB = yA;
        yA = yC;
        yC = this.dots[i+1] ? this.dots[i+1].y : this.height//
        
        xA = this.dots[i].x//
        
        if (i < this.dotsLength - 1) {
        subYaYb = yA - yB;
        subYaYc = yA - yC;
        
        if (subYaYb != subYaYc) {
            k = (Math.sqrt((xStretchSqr + subYaYb * subYaYb) * (xStretchSqr + subYaYc * subYaYc)) - xStretchSqr - subYaYb * subYaYc) / (xStretch * (yC - yB));
        } else { k = 0; }
        
        s = xStretch / 2 * Math.sqrt(1 / (1 + k * k));
        
        xLeft = xA - s;
        yLeft = yA - k * s;
        }
        
        if (i == 1) {
            this.ctx.quadraticCurveTo(xLeft, yLeft, xA, yA);
        } else if (i < this.dotsLength - 1) {
            this.ctx.bezierCurveTo(xRight, yRight, xLeft, yLeft, xA, yA);
        } else {
            this.ctx.quadraticCurveTo(xRight, yRight, xA, yA);
        }
        
        if (i < this.dotsLength - 1) {
        xRight = xA + s;
        yRight = yA + k * s;
        }
        
        }
        
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'blue';
        this.ctx.stroke();
    }
}