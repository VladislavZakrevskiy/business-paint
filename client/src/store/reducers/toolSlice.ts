import { createSlice } from '@reduxjs/toolkit';
import Tool from '../../tools/Tool';
import {LineChart} from '../../tools/Charts/LineChart';
import { Chart } from '../../tools/Charts/Chart';
import { BezierChart } from '../../tools/Charts/BezierChart';
import { Diagram } from '../../tools/Charts/Diagram';
import Equation from '../../components/Equation';
import { Drawer } from '../../tools/Charts/Parser/Drawer';

interface State {
    tool: Tool | null
    chart: LineChart | null,
    bezierChart: BezierChart | null, 
    isChartVisible: boolean,
    isBezierChartVisible: boolean,
    isDiagramVisible: boolean
    diagram: Diagram | null,
    equation: Drawer | null,
    isEquationVisible: boolean
}

const initialState: State = {
    tool: null,
    chart: null,
    bezierChart: null,
    isChartVisible: false,
    isBezierChartVisible: false,
    isDiagramVisible: false,
    diagram: null,
    equation: null,
    isEquationVisible: false
};

const toolSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setTool: (state, action) => {
       state.tool = action.payload 
    },

    setFillColor: (state, action) => {
        state.tool!.fillColor = action.payload
    },

    setStrokeColor: (state, action) => {
        state.tool!.strokeColor = action.payload
    },

    setLineWidth: (state, action) => {
        state.tool!.lineWidth = action.payload
    },

    setChart: (state, action) => {
        state.chart = action.payload
        state.isChartVisible = !state.isChartVisible
    },

    setBezierChart: (state, action) => {
        state.bezierChart = action.payload
        state.isBezierChartVisible = !state.isBezierChartVisible
    },

    setDiagram (state, action) {
        state.diagram = action.payload
        state.isDiagramVisible = !state.isDiagramVisible
    },

    setEquation: (state, action) => {
        state.equation = action.payload
        state.isEquationVisible = !state.isEquationVisible
    }

  }
});

export const { setTool, setFillColor,setLineWidth,setStrokeColor, setChart, setDiagram, setBezierChart, setEquation} = toolSlice.actions;
export default toolSlice.reducer