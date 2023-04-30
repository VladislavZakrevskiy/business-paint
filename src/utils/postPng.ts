import axios from 'axios';
export const postPng = (id: string, canvas: HTMLCanvasElement) => {
    axios.post('https://business-paint.vercel.app/?id=' + id, {
    image: canvas.toDataURL()
  })
}