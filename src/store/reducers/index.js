import { NULL_ACTION } from '../actions';
import middleware from '../middleware';

import authenticationReducer, { initialState as authenticationInitialState } from './authentication';
import yanuxCordinatorReducer, { initialState as yanuxCordinatorInitialState } from './yanuxCoordinator';
import boardReducer, { initialState as boardInitialState } from './board';

const initialState = {
    authentication: authenticationInitialState(),
    yanuxCoordinator: yanuxCordinatorInitialState,
    board: boardInitialState
};

const reduce = (state = initialState, action = NULL_ACTION) => {
    const { authentication, yanuxCoordinator, board } = state;
    const currentState = {
        authentication: authenticationReducer(authentication, action),
        yanuxCoordinator: yanuxCordinatorReducer(yanuxCoordinator, action),
        board: boardReducer(board, action)
    }
    middleware(action, state, currentState);
    return currentState;
};

export { initialState, reduce as default };