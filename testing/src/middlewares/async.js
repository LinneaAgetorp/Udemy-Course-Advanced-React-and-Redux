export default ({ dispatch }) => next => action => {
    // Check to see if the action has a promise on its payload property
    // if it does, wait for it to resolve
    // if it doesn't send the action on to the next middleware

    if(!action.payload || !action.payload.then) { // no payload, no .then
        return next(action) // go to next middleware
    }

    // if we have a promise, we want to wait for promise to resolve ( get the data)
    // and then create a new action and dispatch
    action.payload.then((response) => {
        const newAction = {...action, payload: response};
        dispatch(newAction);
    })

}

