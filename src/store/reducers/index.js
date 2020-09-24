import { NULL_ACTION } from '../actions'

import middleware from '../middleware'

import authenticationReducer, { initialState as authenticationReducerInitialState } from './authentication'

export const initialState = {
    authentication: authenticationReducerInitialState()
};

export default (state = initialState, action = NULL_ACTION) => {
    const { authentication } = state;

    const currentState = {
        authentication: authenticationReducer(authentication, action)
    }

    middleware(action, state, currentState);

    return currentState;
}