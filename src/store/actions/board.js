import * as types from './types';

export const addNote = (id, noteType, payload) => {

    let newNote = {id,noteType,payload};

    return { type: types.ADD_NOTE, newNote }
}

export const setBoard = board => {
    return { type: types.SET_BOARD, board }
}