import ReactDom from "react-dom";
import App from './App'
import 'typeface-roboto'
import './index.css'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk  from 'redux-thunk'
import {reducers} from './reducers'
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composerEnhancer(applyMiddleware(thunk)));
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById("root"))

