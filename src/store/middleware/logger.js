const logger = (action, prevState, currentState) => {
    console.groupCollapsed('State Transition:', action.type);
    console.log('%c Action:', 'color: blue', action);
    console.log('%c Previous State:', 'color: red', prevState);
    console.log('%c Current State:', 'color: green', currentState);
    console.groupEnd();
};

export default logger;