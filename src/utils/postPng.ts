import axios from 'axios';
export const postPng = (id: string, canvas: HTMLCanvasElement) => {
    axios.post('https://business-mo28.onrender.com/image?id=' + id, {
    image: canvas.toDataURL()
  })
}