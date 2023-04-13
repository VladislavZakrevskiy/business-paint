import axios from 'axios';
export const postPng = (id: string, canvas: HTMLCanvasElement) => {
    axios.post('http://localhost:5000/image?id=' + id, {
    image: canvas.toDataURL()
  })
}