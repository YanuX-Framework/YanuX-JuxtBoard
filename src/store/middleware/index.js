import logger from './logger';

export default (action, prevState, currentState) => {
    logger(action, prevState, currentState);
}