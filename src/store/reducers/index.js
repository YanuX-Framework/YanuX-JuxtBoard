import { NULL_ACTION } from '../actions';
import middleware from '../middleware';

import authenticationReducer, { initialState as authenticationInitialState } from './authentication';
import yanuxCordinatorReducer, { initialState as yanuxCordinatorInitialState } from './yanuxCoordinator';

export const initialState = {
    authentication: authenticationInitialState(),
    yanuxCoordinator: yanuxCordinatorInitialState
};

export default (state = initialState, action = NULL_ACTION) => {
    const { authentication, yanuxCoordinator } = state;
    const currentState = {
        authentication: authenticationReducer(authentication, action),
        yanuxCoordinator: yanuxCordinatorReducer(yanuxCoordinator, action)
    }
    middleware(action, state, currentState);
    return currentState;
};