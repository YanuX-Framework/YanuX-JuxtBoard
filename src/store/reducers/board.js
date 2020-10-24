import { NULL_ACTION } from '../actions';
import * as types from '../actions/types';

const initialState = {
    notes: []
}

const reduce = (state = initialState, action = NULL_ACTION) => {
    switch (action.type) {
        case types.ADD_NOTE:
            return Object.assign({}, state, {
                notes: [...state.notes, action.text]
            });
        case types.SET_BOARD:
            return Object.assign({}, state, {
                notes: action.board ? action.board.notes : null || []
            });
        default:
            return state;
    }
};

export { initialState, reduce as default };