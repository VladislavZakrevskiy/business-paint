import { useAppSelector } from "../store/hooks"
import axios from 'axios';

export const  loadStartPng = (id: string, canvas: HTMLCanvasElement) => {
    axios.get('http://localhost:5000/image?id=' + id)
      .then((res: any) => {
        const img = new Image()
        const ctx = canvas!.getContext('2d')
        img.src = res.data
        img.onload = () => {
            ctx?.clearRect(0, 0, canvas?.width , canvas?.height)
            // @ts-ignore
            ctx?.drawImage(img, 0, 0, canvas?.width , canvas?.height)
        }
      })
}