import logger from './logger';
import yanuxCoordinator from './yanuxCoordinator';

const middleware = (action, prevState, currentState) => {
    //TODO: I could probably develop a fancier way to register these middleware-like functions.
    //But I think this way works well enough!
    logger(action, prevState, currentState);
    yanuxCoordinator(action, prevState, currentState);
};

export default middleware;