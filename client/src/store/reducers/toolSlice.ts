import { createSlice } from '@reduxjs/toolkit';
import Tool from '../../tools/Tool';
import {LineChart} from '../../tools/Charts/LineChart';
import { Chart } from '../../tools/Charts/Chart';
import { BezierChart } from '../../tools/Charts/BezierChart';
import { Diagram } from '../../tools/Charts/Diagram';

interface State {
    tool: Tool | null
    chart: LineChart | BezierChart | null
    isChartVisible: boolean
    isDiagramVisible: boolean
    diagram: Diagram | null
}

const initialState: State = {
    tool: null,
    chart: null,
    isChartVisible: false,
    isDiagramVisible: false,
    diagram: null
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

    toggleDiagramVisible: (state) => {
        state.isDiagramVisible = !state.isDiagramVisible
    },

    setDiagram (state, action) {
        state.diagram = action.payload
    }

  }
});

export const { setTool, setFillColor,setLineWidth,setStrokeColor, setChart, toggleDiagramVisible, setDiagram} = toolSlice.actions;
export default toolSlice.reducer