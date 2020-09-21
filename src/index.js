import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';

import rootReducer, { initialState } from './reducers'

const GlobalStore = React.createContext();

const Provider = ({children}) => {
    const [state, dispatchBase] = React.useReducer(rootReducer, initialState);
    
    const asyncer = (dispatch, state) => action => {
      typeof action === 'function' ? action(dispatch, state) : dispatch(action);
    }
    
    const dispatch = React.useCallback(asyncer(dispatchBase, state), []);

    return (
        <GlobalStore.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStore.Provider>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
