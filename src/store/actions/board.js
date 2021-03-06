import * as types from './types';

export const addNote = (id, noteType, payload) => {

    let newNote = { id, noteType, payload };

    return { type: types.ADD_NOTE, newNote }
}

export const removeNote = (id) => {
    return { type: types.REMOVE_NOTE, id }
}

export const updateNote = (id, payload) => {
    return { type: types.UPDATE_NOTE, id, payload }
}

export const updateSelectedNote = (id, action = null) => {
    return { type: types.SELECT_NOTE, id, action }
}

export const setBoard = board => {
    const defaultBoard = { notes: [], selectedNote: null, currentAction: null };
    if (!board) { board = defaultBoard }
    else {
        board.notes = board.notes || defaultBoard.notes;
        board.selectedNote = board.selectedNote || defaultBoard.selectedNote;
        board.currentAction = board.currentAction || defaultBoard.currentAction;
    }
    return { type: types.SET_BOARD, board }
}