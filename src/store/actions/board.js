import * as types from './types';

export const addNote = (id, noteType, payload) => {

    let newNote = {id,noteType,payload};

    return { type: types.ADD_NOTE, newNote }
}

export const removeNote = (id) => {
    return { type: types.REMOVE_NOTE, id }
}

export const setBoard = board => {
    return { type: types.SET_BOARD, board }
}