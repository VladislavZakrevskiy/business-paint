import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setChart } from '../store/reducers/toolSlice'
import { LineChart } from '../tools/Charts/LineChart'
import { Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap'
import '../styles/canvas.scss'
import { Chart } from '../tools/Charts/Chart'

const BezierChartBar = () => {
    const dispatch = useAppDispatch()
    const {canvas, id, socket} = useAppSelector(state => state.canvasSlice)
    const {isBezierChartVisible, bezierChart: chart} = useAppSelector(state => state.toolSlice)
    const [dots, setDots] = useState<number[]>([])
    const [names, setNames] = useState<string[]>([])
    const [withDots, setWithDots ] = useState<boolean>(false)

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
        chart?.clearDot()
        for (let i = 0;i<dots.length; i++) {
            chart?.setDot(dots[i], names[i])
        }
        chart?.draw(withDots)
    }

    const drawWeb = (type: 'vert' | 'horiz' | 'both' | 'remove') => {
        switch (type) {
            case 'both':
                chart?.drawWeb('both')
                setAll()
                break;
            case 'horiz':
                chart?.drawWeb('horiz')
                setAll()
                break;
            case 'vert':
                chart?.drawWeb('vert')
                setAll()
                break;
            case 'remove':
                chart?.drawWeb('remove')
                setAll()
                break;
        }
    } 


  return (
    <Container
        style={{display: isBezierChartVisible ? 'flex' : 'none', marginTop: '60px', flexDirection: 'column', padding: 40, gap: 10}}
        
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
                </Row>
            )
        }
            <Button onClick={setAll}>Set All</Button>
            <ButtonGroup>
                <Button onClick={() => {
                    setWithDots(true)
                    setAll()    
                }}>
                    With Dots
                </Button>
                <Button onClick={() => {
                    setWithDots(false)
                    setAll()
                }}>
                    Without Dots
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={() => drawWeb('remove')}>
                    Update
                </Button>
                <Button onClick={() => drawWeb('both')}>
                    Both
                </Button>
                <Button onClick={() => drawWeb('horiz')}>
                    Hor
                </Button>
                <Button onClick={() => drawWeb('vert')}>
                    Vert
                </Button>
            </ButtonGroup>
            <Button onClick={() => setDots(prev => [...prev, 0])}>+</Button>

    </Container>
  )
}

export default BezierChartBar