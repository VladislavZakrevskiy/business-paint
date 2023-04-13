import { createSlice } from '@reduxjs/toolkit';
import Tool from '../../tools/Tool';
import { undo } from './canvasSlice';
import LineChart from '../../tools/Charts/Chart';

interface State {
    tool: Tool | null
    chart: LineChart | null
    isChartVisible: boolean
}

const initialState: State = {
    tool: null,
    chart: null,
    isChartVisible: false
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
    },

    toggleChartVisible: (state) => {
        state.isChartVisible = !state.isChartVisible
    }

  }
});

export const { setTool, setFillColor,setLineWidth,setStrokeColor, setChart, toggleChartVisible} = toolSlice.actions;
export default toolSlice.reducer