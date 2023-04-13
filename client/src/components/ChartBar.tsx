import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setChart } from '../store/reducers/toolSlice'
import LineChart, { IDot } from '../tools/Charts/Chart'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import '../styles/canvas.scss'

const ChartBar = () => {
    const dispatch = useAppDispatch()
    const {canvas, id, socket} = useAppSelector(state => state.canvasSlice)
    const {isChartVisible, chart} = useAppSelector(state => state.toolSlice)
    const [dots, setDots] = useState<number[]>([])
    const [names, setNames] = useState<string[]>([])

    useEffect(()=> {
        if(canvas && socket && id){
            dispatch(setChart(new LineChart(canvas, socket, id)))
        }
    }, [canvas, socket, id])

    const addDot = (index: number) => {
        chart?.setDot(dots[index])
        chart?.draw()
    }

    const addForm = <T,>(i: number, value: T, type: 'x' | 'name') => {
        let dotsCopy = [...dots]
        let namesCopy = [...names]
        switch (type) {
            case 'x': 
                //@ts-ignore
                dotsCopy[i] = value
                break
            case 'name':
                //@ts-ignore
                namesCopy[i] = value
                break

        }
        setDots(dotsCopy)
        setNames(namesCopy)
    }

    const setAll = () => {
        for (let i = 0;i<dots.length; i++) {
            chart?.setDot(dots[i])
        }
        chart?.draw()
    }


  return (
    <Container
        style={{display: isChartVisible ? 'flex' : 'none', marginTop: '60px', flexDirection: 'column', padding: 40, gap: 10}}
        
    >
        {
            dots.map((item, i) => 
                <Row key={i}>
                        <Form.Control 
                            type='number' 
                            value={dots[i]} 
                            onChange={e => addForm<number>(i, +e.target.value, 'x')}
                            placeholder='Данные'
                            />
                        <Form.Control 
                            type='text' 
                            value={names[i]} 
                            onChange={e => addForm<string>(i, e.target.value, 'name')}
                            placeholder='Название'
                            />                
                        <Button onClick={() => addDot(i)}>Set</Button>
                </Row>
            )
        }
            <Button onClick={setAll}>Set All</Button>
            <Button onClick={() => setDots(prev => [...prev, 0])}>+</Button>

    </Container>
  )
}

export default ChartBar