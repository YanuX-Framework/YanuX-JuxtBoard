import { NULL_ACTION } from '../actions';
import * as types from '../actions/types';

const initialState = {
    notes: [],
    selectedNote: null
}


const reduce = (state = initialState, action = NULL_ACTION) => {
    switch (action.type) {
        case types.ADD_NOTE:
            return Object.assign({}, state, {
                notes: [...state.notes, action.newNote]
            });
        case types.REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.id)
            }
        case types.UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id !== action.id) { return note; }
                    return { ...note, payload: action.payload }
                })
            }
        case types.SELECT_NOTE:
            return {
                ...state,
                selectedNote: action.id,
                currentAction: action.action
            }
        case types.SET_BOARD:
            return Object.assign({}, state, action.board);
        default:
            return state;
    }
};

export { initialState, reduce as default };