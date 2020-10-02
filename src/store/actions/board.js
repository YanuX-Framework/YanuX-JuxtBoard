import * as types from './types';

export const addNote = text => {
    return { type: types.ADD_NOTE, text }
}

export const setBoard = board => {
    return { type: types.SET_BOARD, board }
}