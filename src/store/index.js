import React, { createContext, useContext, useReducer, useCallback } from 'react';

import rootReducer, { initialState } from './reducers';

const GlobalStore = createContext({});

export const useGlobalStore = () => useContext(GlobalStore);

export default function Provider({ children }) {
    const [state, dispatchBase] = useReducer(rootReducer, initialState);

    const asyncer = (dispatch, state) => action => {
        typeof action === 'function' ? action(dispatch, state) : dispatch(action);
    }

    const dispatch = useCallback(asyncer(dispatchBase, state), []);

    return (<GlobalStore.Provider value={{ state, dispatch }}>{children}</GlobalStore.Provider>);
}