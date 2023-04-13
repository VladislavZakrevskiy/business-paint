import { createSlice } from '@reduxjs/toolkit';
import Tool from '../../tools/Tool';
import { undo } from './canvasSlice';

interface State {
    tool: Tool | null
}

const initialState: State = {
    tool: null
};

const toolSlice = createSlice({
  name: 'canvas',
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

  }
});

export const { setTool, setFillColor,setLineWidth,setStrokeColor } = toolSlice.actions;
export default toolSlice.reducer