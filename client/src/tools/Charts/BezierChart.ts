//@ts-nocheck
import { Chart } from "./Chart";



export class BezierChart extends Chart {

    constructor (canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
    }

    draw (isDots: boolean) {
        this.getReadyDots()
        if (isDots) {
            this.drawDots()
        }
        let xStretch = this.partsX;//

        let xStretchSqr = xStretch * xStretch;
        let yA, yB, yC, xA, subYaYb, subYaYc, k, s, xLeft, yLeft, xRight, yRight;
        
        this.ctx.beginPath();
        yA = this.dots[0].y//
        yC = this.dots[1].y//
        
        this.ctx.moveTo(this.padding, yA);//
        for (let i = 1; i < this.dotsLength; i++) {
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
        
        this.ctx.stroke();
    }
}