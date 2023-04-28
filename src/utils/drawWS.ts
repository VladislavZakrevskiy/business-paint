// @ts-nocheck
import { drawMessage } from "../models/message"
import Brush from "../tools/Brush"
import Circle from "../tools/Circle"
import Eraser from "../tools/Eraser"
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import undoRedo from "../tools/UndoRedo"

export const drawHandler = (msg: drawMessage, canvas: HTMLCanvasElement, tool: undoRedo) => {
    const figure = msg!.figure
    const ctx: CanvasRenderingContext2D | null = canvas!.getContext('2d')
    switch (figure.type){
      case 'brush': 
        Brush.staticDraw(ctx!, figure.x, figure.y, figure.fillColor, figure.strokeColor, figure.lineWidth)
        break
      case 'rect':
        Rect.staticDraw(ctx!, figure.x, figure.y, figure.width, figure.height, figure.fillColor, figure.strokeColor, figure.lineWidth)
        break
      case 'circle':
        Circle.staticDraw(ctx!, figure.x, figure.y, figure.radius, figure.fillColor, figure.strokeColor, figure.lineWidth)
        break
      case 'eraser':
        Eraser.staticDraw(ctx!, figure.x, figure.y, figure.lineWidth)
        break
      case 'line':
        Line.staticDraw(ctx!, figure.x, figure.y, figure.currentX, figure.currentY, figure.fillColor, figure.strokeColor, figure.lineWidth)
        break
      case 'finish':
        ctx!.beginPath()
        tool.pushUndo(canvas.toDataURL())
        break
    }
  }