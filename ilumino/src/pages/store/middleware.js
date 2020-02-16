const logger = ({getState, dispatch}) => next => action => {
    next(action);
}

export default logger;