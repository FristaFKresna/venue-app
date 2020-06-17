import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));
const withStore = (Component) => {
  return () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

export default withStore;
