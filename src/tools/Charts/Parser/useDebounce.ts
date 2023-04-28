// @ts-nocheck
import { useCallback, useRef } from "react"

export const useDebouce = (callback: (e: React.SetStateAction<string>) => any, delay: number) => {
    const timer = useRef()

    const debouncedCallback = useCallback((...args: any) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => callback(...args), delay)

    }, [callback, delay])
    
    return debouncedCallback
}