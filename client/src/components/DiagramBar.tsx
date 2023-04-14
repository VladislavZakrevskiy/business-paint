import React, { useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { useAppSelector } from '../store/hooks'

type Props = {}

const DiagramBar = (props: Props) => {
    const [numbers, setNumbers] = useState<number[]>([])
    const [colors, setColors] = useState<string[]>([])
    const {diagram, isDiagramVisible} = useAppSelector(state => state.toolSlice)
    const {canvas, id, socket, tool} = useAppSelector(state => state.canvasSlice)

    const addForm = <T,>(i: number, value: T, type: 'number' | 'color') => {
        let numbersCopy = [...numbers]
        let colorsCopy = [...colors]
        switch (type) {
            case 'number': 
                //@ts-ignore
                numbersCopy[i] = value
                break
            case 'color':
                //@ts-ignore
                colorsCopy[i] = value
                break

        }
        setNumbers(numbersCopy)
        setColors(colorsCopy)
        addToDiagram()
        diagram?.countProcent()
    }

    const addToDiagram = () => {
        diagram?.clearNumbers()
        for (let i = 0; i < numbers.length; i++){
            diagram?.setNumber(numbers[i], colors[i])
        }
    }


  return (
    <Container
        style={{display: isDiagramVisible ? 'flex' : 'none', marginTop: '60px', flexDirection: 'column', padding: 40, gap: 10}}
        
    >
        {
            numbers.map((item, i) => 
                <Row>
                    <Form.Control 
                        type='number' 
                        value={numbers[i]} 
                        onChange={e => addForm(i, e.target.value, 'number')}/>
                    <Form.Control 
                        type='color' 
                        value={colors[i]} 
                        onChange={e => addForm(i, e.target.value, 'color')}/>
                </Row>
            )
        }
        <Button onClick={() => setNumbers(prev => [...prev, 0])}>+</Button>
    </Container>
  )
}

export default DiagramBar