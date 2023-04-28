import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { useAppDispatch } from '../hooks';
import undoRedo from '../../tools/UndoRedo';

interface State {
    canvas:  HTMLCanvasElement | null,
    tool: undoRedo | null,
    username: string | null
    socket: WebSocket | null
    id: string 
    undoList: string[] 
    redoList: string[]
}

const initialState: State = {
    canvas: null,
    tool: null,
    username: null,
    id: '',
    socket: null,
    redoList: [],
    undoList: []
};



const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state, action) => {
        state.canvas = action.payload
    },
    
    setUndoRedo: (state, action) => {
      //@ts-ignore
      state.tool = action.payload
    },

    setUsername: (state, action) => {
      state.username = action.payload
    },
    
    setSocket: (state, action) => {
      state.socket = action.payload
    },

    setId: (state, action) => {
      state.id = action.payload
    },

    setUndoList: (state, action) => {
      state.undoList = action.payload
    },

    setRedoList: (state, action) => {
      state.redoList = action.payload
    },
  },

});

export const { setUndoRedo, setCanvas, setUsername, setId, setSocket, setRedoList, setUndoList } = canvasSlice.actions;
export default canvasSlice.reducer