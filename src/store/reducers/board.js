import { NULL_ACTION } from '../actions';
import * as types from '../actions/types';

export const initialState = {
    notes: []
}

export default (state = initialState, action = NULL_ACTION) => {
    switch (action.type) {
        //TODO: Implement Board Specific Actions
        //e.g.:
        case types.NULL:
            return Object.assign(state, {
                //Something you want to change/override
            })
        default:
            return state;
    }
}
